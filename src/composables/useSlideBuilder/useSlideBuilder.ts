import { useOpenAi } from '../useOpenAi';
import type { Message } from '../useOpenAi';
import type { SlideText } from '../../types/slide';
import { instructions, prompts, topic } from './prompts';

const TrailingPunctExpr = /\.\s*$/;

export function useSlideBuilder() {
  const { ask } = useOpenAi();

  function unquote(str: string): string {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.substring(1, str.length - 2);
    }
    return str;
  }

  function removeTrailingPunct(str: string): string {
    return str.replace(TrailingPunctExpr, '');
  }

  function cleanUp(str: string): string {
    return removeTrailingPunct(unquote(str));
  }

  function buildInitialHistory(...moreDetails: string[]): Message[] {
    return [{ role: 'system', content: instructions }, ...moreDetails.map((detail) => ({ role: 'system', content: detail }))];
  }

  async function findTopic(): Promise<string> {
    const messages = [...buildInitialHistory(), { role: 'user', content: topic.prompt }];
    return await ask(messages).then((answer) => cleanUp(answer.content));
  }

  async function generate(forTopic: string): Promise<SlideText[]> {
    const slides: SlideText[] = [];
    const history = buildInitialHistory(topic.summary(forTopic));

    for (const { prompt, summary } of prompts) {
      const messages = [...history, { role: 'user', content: prompt }];
      const answer = await ask(messages);
      if (summary) {
        history.push({ role: 'system', content: summary(answer.content) });
      } else {
        history.push({ role: 'user', content: prompt }, { role: 'assistant', content: prompt });
      }
      slides.push({ type: 'text', prompt, text: answer.content });
    }

    return slides;
  }

  return {
    findTopic,
    generate,
  };
}
