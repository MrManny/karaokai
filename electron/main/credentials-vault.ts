import { readFileSync, writeFileSync } from 'node:fs';
import { credentials } from './paths';
import { credentialsSchema } from './credentials-schema';
import type { Credentials } from './credentials-schema';

const IoOptions = { encoding: 'utf-8' } as const;

function load(): Credentials {
  try {
    const raw = readFileSync(credentials, IoOptions);
    const unvalidated = JSON.parse(raw);
    return credentialsSchema.parse(unvalidated);
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      return {};
    }
    throw e;
  }
}

const vault = load();

function save(): void {
  const serialized = JSON.stringify(vault);
  writeFileSync(credentials, serialized);
}

export function vaultKeys(): (keyof Credentials)[] {
  return Object.keys(vault);
}

export function getCredential(name: string): string | undefined {
  return vault[name];
}

export function setCredential(name: string, value: string): void {
  vault[name] = value;
  save();
}
