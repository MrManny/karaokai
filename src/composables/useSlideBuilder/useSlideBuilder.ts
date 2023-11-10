import type { Message } from '../useOpenAi';
import { useOpenAi } from '../useOpenAi';
import { fallbackPrompt, drawImage, instructions, topic } from './prompts';

const TrailingPunctExpr = /\.\s*$/;

export function useSlideBuilder() {
  const { ask, draw } = useOpenAi();

  function unquote(str: string): string {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.substring(1, str.length - 1);
    }
    return str;
  }

  function removeTrailingPunct(str: string): string {
    return str.replace(TrailingPunctExpr, '');
  }

  const cleanUpPipeline: ((str: string) => string)[] = [(s) => s.trim(), unquote, removeTrailingPunct];

  function cleanUp(str: string): string {
    return cleanUpPipeline.reduce((strSoFar, fn) => fn(strSoFar), str);
  }

  function buildInitialHistory(...moreDetails: string[]): Message[] {
    return [
      { role: 'system', content: instructions },
      ...moreDetails.map((detail) => ({ role: 'system', content: detail })),
    ];
  }

  function pick<T>(ary: T[], howMany = 1): T[] {
    const pool: T[] = [...ary];
    const picked: T[] = [];
    for (let i = 0; i < howMany; i++) {
      const len = pool.length;
      const pickIndex = Math.floor(Math.random() * len);
      const pick = pool[pickIndex];
      picked.push(pick);
      pool.splice(pickIndex, 1);
    }
    return picked;
  }

  async function findTopic(): Promise<string> {
    const messages = [...buildInitialHistory(), { role: 'user', content: topic.prompt }];
    const answer = await ask(messages);
    return cleanUp(answer.content);
  }

  async function generateText(forTopic: string, slideNumber?: number): Promise<string> {
    const [history] = buildInitialHistory(topic.summary(forTopic));
    const prompt = fallbackPrompt(slideNumber);
    const messages = [history, { role: 'user', content: prompt }];
    return await ask(messages).then((m) => cleanUp(m.content));
  }

  async function generateImage(slideText: string): Promise<string> {
    const messages = [
        ...buildInitialHistory(),
        { role: 'user', content: `The slide's text is: ${slideText}` },
        { role: 'user', content: drawImage.prompt },
    ];
    const prompt = await ask(messages).then((m) => cleanUp(m.content));
    return await draw(prompt);
  }

  return {
    findTopic,
    generateText,
    generateImage,
  };
}
