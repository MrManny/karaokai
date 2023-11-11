import type { Message } from '../useOpenAi';
import { useOpenAi } from '../useOpenAi';
import { fallbackPrompt, drawImage, instructions, topic } from './prompts';

export function useSlideBuilder() {
  const { ask, draw } = useOpenAi();

  function buildInitialHistory(...moreDetails: string[]): Message[] {
    return [
      { role: 'system', content: instructions },
      ...moreDetails.map((detail) => ({ role: 'system', content: detail })),
    ];
  }

  async function findTopic(): Promise<string> {
    const messages = [...buildInitialHistory(), { role: 'user', content: topic.prompt }];
    const answer = await ask(messages);
    return answer.content;
  }

  async function generateText(forTopic: string, slideNumber?: number): Promise<string> {
    const history = buildInitialHistory(topic.summary(forTopic));
    const prompt = fallbackPrompt(slideNumber);
    const messages = [...history, { role: 'user', content: prompt }];
    return await ask(messages).then((m) => m.content);
  }

  async function generateImage(slideText: string): Promise<string> {
    const messages = [
      ...buildInitialHistory(),
      { role: 'user', content: `The slide's text is: ${slideText}` },
      { role: 'user', content: drawImage.prompt },
    ];
    const prompt = await ask(messages).then((m) => m.content);
    return await draw(prompt);
  }

  return {
    findTopic,
    generateText,
    generateImage,
  };
}
