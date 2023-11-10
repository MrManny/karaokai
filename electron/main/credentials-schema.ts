import { z } from 'zod';

export const providerSchema = z.enum(['openai']);

export const credentialsSchema = z.record(providerSchema, z.string().min(1));

export type Credentials = z.infer<typeof credentialsSchema>;
