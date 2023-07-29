import { z } from 'zod';

export const credentialsSchema = z.record(z.string());

export type Credentials = z.infer<typeof credentialsSchema>;
