import { z } from 'zod';

const promptSchema = z.string().trim().default('');

const slideSchema = z.object({
  text: z
    .object({
      text: z.string().trim(),
      prompt: promptSchema,
    })
    .optional(),

  image: z
    .object({
      base64: z.string().regex(/^data:image\/(png|jpeg|webp|gif);base64,[^ ]+$/),
      prompt: promptSchema,
    })
    .optional(),
});

export const presentationSchema = z.object({
  topic: z.string(),
  slides: z.array(slideSchema),
  meta: z.record(z.unknown()).default({}),
});

export type Presentation = z.infer<typeof presentationSchema>;
