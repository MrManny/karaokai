import { ipcMain } from 'electron';
import { readFile, writeFile } from 'node:fs/promises';
import { Io } from './ipc-keys';
import type { Presentation } from '../presentation-schema';
import { presentationSchema } from '../presentation-schema';

ipcMain.handle(Io.Load, async (_, path: string): Promise<Presentation> => {
  const raw = await readFile(path, { encoding: 'utf-8' });
  return presentationSchema.parse(raw);
});

ipcMain.handle(Io.Save, async (_, path: string, presentation: Presentation): Promise<void> => {
  const serialized = JSON.stringify(presentation, null, 0);
  await writeFile(path, serialized, { encoding: 'utf-8' });
});
