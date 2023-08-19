import { z } from 'zod';
import { slideSchema } from './slide-schema';

export const presentationSchema = z.object({
  topic: z.string(),
  slides: z.array(slideSchema),
  meta: z
    .object({
      fileName: z.string().optional(),
    })
    .passthrough()
    .optional(),
});

export type Presentation = z.infer<typeof presentationSchema>;
