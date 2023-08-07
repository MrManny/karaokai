import { z } from 'zod';

const modelSchema = z.string().default('gpt-3.5-turbo');

export const messageSchema = z.object({
  content: z.string(),
  role: z.enum(['assistant', 'user', 'system']).default('user'),
  name: z.string().optional(),
});

export type Message = z.infer<typeof messageSchema>;

const responseChoice = z.object({
  finish_reason: z.string(),
  index: z.number().int().nonnegative(),
  message: messageSchema,
});

export const responseSchema = z.object({
  choices: z.array(responseChoice),
  created: z.number().nonnegative(),
  id: z.string(),
  model: modelSchema,
  object: z.string().default('chat.completion'),
  usage: z.object({
    completion_tokens: z.number().int().nonnegative(),
    prompt_tokens: z.number().int().nonnegative(),
    total_tokens: z.number().int().nonnegative(),
  }),
});
