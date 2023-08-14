export const instructions =
  "You are an assistant who generates ambiguous content for PowerPoint slides. You only express yourself in at most three keywords. Don't write in full sentences.";

export const topic = {
  prompt: 'What would be a funny topic for PowerPoint karaoke?',
  summary: (str: string) => `The topic is "${str}".`,
};

function suffix(num: number): string {
  const lastDigit = num % 10;
  const suffixFor1 = lastDigit === 1 && num !== 11;
  if (suffixFor1) return 'st';
  const suffixFor2 = lastDigit === 2 && num !== 21;
  if (suffixFor2) return 'nd';
  const suffixFor3 = lastDigit === 3 && num !== 13;
  if (suffixFor3) return 'rd';
  return 'th';
}

export const fallbackPrompt = (slideNumber?: number) => {
  const slideNumberStr = slideNumber !== undefined ? `the ${slideNumber}${suffix(slideNumber)} slide` : `any slide`;

  return `Write the text for the ${slideNumberStr}. It can be a fun quote, a silly pun, random statistics, or a few keywords.`;
};
