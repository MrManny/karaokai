import type { Message } from '../useOpenAi';
import { useOpenAi } from '../useOpenAi';
import { fallbackPrompt, instructions, topic } from './prompts';
import { useStabilityAi } from '../useStabilityAi/useStabilityAi';
import { styles } from './styles';
import { artists } from './artists';

const TrailingPunctExpr = /\.\s*$/;

export function useSlideBuilder() {
  const { ask } = useOpenAi();
  const { text2image } = useStabilityAi();

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

  function pick(ary: string[], howMany = 1): string[] {
    const pool: string[] = [...ary];
    const picked: string[] = [];
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

  async function findImagePrompts(text: string): Promise<string> {
    const messages: Message[] = [
      {
        role: 'system',
        content:
          'You generate three simple keywords. The first two keywords summarize the topic of the provided text. The last keyword is a random noun. Write down the keywords in a comma-separated list.',
      },
      { role: 'user', content: text },
    ];
    const { content: keywords } = await ask(messages);
    const [style] = pick(styles);
    const artist = pick(artists, 2).join(' and ');
    return `${keywords}, ${style}, by ${artist}`;
  }

  async function generateImage(prompt: string): Promise<string> {
    return await text2image(prompt);
  }

  return {
    findImagePrompts,
    findTopic,
    generateText,
    generateImage,
  };
}
