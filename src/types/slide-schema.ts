import { z } from 'zod';

const promptSchema = z.string().trim();

export const slideSchema = z.object({
  text: z
    .object({
      text: z.string().trim(),
      prompt: promptSchema.default(''),
      negative: promptSchema.optional(),
    })
    .optional(),

  image: z
    .object({
      base64: z.string().regex(/^data:image\/(png|jpeg|webp|gif);base64,[^ ]+$/),
      prompt: promptSchema.default(''),
    })
    .optional(),
});

export type Slide = z.infer<typeof slideSchema>;
