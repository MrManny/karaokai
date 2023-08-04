export const instructions =
  "You are an assistant who generates ambiguous content for PowerPoint slides. You only express yourself in at most three keywords. Don't write in full sentences.";

export const topic = {
  prompt: 'What would be a funny topic for PowerPoint karaoke?',
  summary: (str: string) => `The topic is "${str}".`,
};

export const prompts = [
  {
    prompt: 'What are keywords for the first slide? Use buzzwords.',
    summary: (str: string) => `The keywords for the first slide are: ${str}.`,
  },
  {
    prompt: 'Write a relevant funny quote.',
  },
  {
    prompt: 'What are the keywords for the second slide. Mix in a keyword that does not relate to this topic.',
    summary: (str: string) => `The keywords for the second slide are: ${str}.`,
  },
  {
    prompt: 'Write funny keywords to solve this problem.',
    summary: (str: string) => `The solution is: ${str}.`,
  },
  {
    prompt: 'Summarize your three key findings on a final slide with keywords.',
    summary: (str: string) => `The key findings are: ${str}.`,
  },
];
