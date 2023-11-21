import type { Message } from '../useOpenAi';
import { useOpenAi } from '../useOpenAi';
import { fallbackPrompt, drawImage, instructions, topic } from './prompts';

export function useSlideBuilder() {
  const { ask, draw } = useOpenAi();

  function systemMessage(content: string): Message & { role: 'system' } {
    return {
      role: 'system',
      content,
    };
  }

  function userMessage(content: string): Message & { role: 'user' } {
    return {
      role: 'user',
      content,
    };
  }

  function buildInitialHistory(...moreDetails: string[]): Message[] {
    return [systemMessage(instructions), ...moreDetails.map((detail) => systemMessage(detail))];
  }

  async function findTopic(): Promise<string> {
    const messages = [...buildInitialHistory(), userMessage(topic.prompt)];
    const answer = await ask(messages);
    return answer.content;
  }

  async function generateText(forTopic: string, slideNumber?: number): Promise<string> {
    const history = buildInitialHistory(topic.summary(forTopic));
    const prompt = fallbackPrompt(slideNumber);
    const messages = [...history, userMessage(prompt)];
    return await ask(messages).then((m) => m.content);
  }

  async function generateImage(slideText?: string, topic?: string): Promise<string> {
    const details: string[] = [];
    if (topic) {
      details.push(`The topic is: ${topic}`);
    }
    if (slideText) {
      details.push(`The slide contains the text: ${slideText}`);
    }
    const messages = [...buildInitialHistory(...details), { role: 'user', content: drawImage.prompt }];
    const prompt = await ask(messages).then((m) => m.content);
    return await draw(prompt);
  }

  return {
    findTopic,
    generateText,
    generateImage,
  };
}
