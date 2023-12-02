import type { Slide } from '../../types/slide-schema';

const base = 'You are a generator for PowerPoint karaoke slides.';

export const instructions = {
  slides: `${base} The slide text should be humorous, unexpected, and short. Image prompts can be used for each slide and will be forwarded to DALL-E. Follow the following format for each slide:\\n\\n## Slide\\n\\n * Text:\\n * Image prompt:`,
  topic: `${base} You are a generator for PowerPoint`,
};
const slideFormat = /\* Text: (?<text>[^\n]+)\s+\* Image prompt: (?<prompt>[^\n]+)/g;

export const topic = {
  prompt: 'Give me one funny topic for PowerPoint karaoke. Avoid quotation marks.',
  summary: (str: string) => `The topic is "${str}".`,
};

export const slides = (topic: string, count: number) => `Generate ${count} slides about "${topic}"`;

function trim(str: string | undefined): string {
  if (!str) return '';
  let trimmed = str.trim();
  const quoted = trimmed.startsWith('"') && trimmed.endsWith('"');
  if (quoted) {
    trimmed = trimmed.substring(1, trimmed.length - 1);
  }
  return trimmed;
}

export type RawSlideData = { text: string; prompt: string };
export function parseSlides(slides: string): Slide[] {
  const matched = [...slides.matchAll(slideFormat)];
  if (!matched.length) throw new Error(`Failed to find any slides in the given string:\n${slides}`);

  return matched.map((entry) => ({
    text: { text: trim(entry.groups?.text) },
    image: { prompt: trim(entry.groups?.prompt) },
  }));
}
