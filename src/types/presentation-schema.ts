import { z } from 'zod';
import { slideSchema } from './slide-schema';

const timerSchema = z.object({
  timePerTick: z.number().min(1000).max(180000),
});

export const presentationSchema = z.object({
  topic: z.string(),
  slides: z.array(slideSchema),
  timer: timerSchema.optional(),
  meta: z
    .object({
      fileName: z.string().optional(),
    })
    .passthrough()
    .optional(),
});

export type Presentation = z.infer<typeof presentationSchema>;
