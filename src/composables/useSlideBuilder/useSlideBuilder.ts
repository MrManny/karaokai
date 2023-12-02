import type { Message } from '../useOpenAi';
import { useOpenAi } from '../useOpenAi';
import { instructions, parseSlides, slides, topic } from './prompts';
import { TokenName, useVault } from '../useVault';
import { computed } from 'vue';
import type { Slide } from '../../types/slide-schema';

export function useSlideBuilder() {
  const { ask, draw } = useOpenAi();
  const { has } = useVault();

  const isAvailable = computed(async () => await has(TokenName.OpenAi));

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

  async function findTopic(): Promise<string> {
    const messages = [systemMessage(instructions.topic), userMessage(topic.prompt)];
    const answer = await ask(messages);
    return answer.content;
  }

  async function generateText(forTopic: string, slideCount: number): Promise<Slide[]> {
    const messages = [systemMessage(instructions.slides), userMessage(slides(forTopic, slideCount))];
    const { content } = await ask(messages);
    const parsed = parseSlides(content);
    console.debug({ parsed });
    return parsed;
  }

  async function generateImage(prompt: string): Promise<string> {
    return await draw(prompt);
  }

  return {
    findTopic,
    generateText,
    generateImage,
    isOpenaiAvailable: isAvailable,
  };
}
