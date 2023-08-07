import { z } from 'zod';

export const responseSchema = z.object({
  artifacts: z
    .array(
      z.object({
        base64: z.string(),
        finishReason: z.string(),
        seed: z.number().int(),
      })
    )
    .min(1),
});
