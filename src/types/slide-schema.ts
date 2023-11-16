import { z } from 'zod';

const promptSchema = z.string().trim();

export const slideSchema = z.object({
  text: z
    .object({
      text: z.string().trim(),
      prompt: promptSchema.optional(),
    })
    .optional(),

  image: z
    .object({
      base64: z.string().regex(/^data:image\/(png|jpeg|webp|gif);base64,[^ ]+$/),
      prompt: promptSchema.optional(),
      negative: promptSchema.optional(),
    })
    .optional(),
});

export type Slide = z.infer<typeof slideSchema>;
