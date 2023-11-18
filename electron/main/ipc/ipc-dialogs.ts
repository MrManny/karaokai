import { dialog, ipcMain } from 'electron';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const imageExtensionExpression = /\.(png|jpe?g|gif|webp)$/i;

async function listFolder(folder: string): Promise<string[]> {
  const contents = await readdir(folder, {
    recursive: false,
    encoding: 'utf-8',
    withFileTypes: true,
  });
  return contents
    .filter((entry) => entry.isFile())
    .filter((entry) => imageExtensionExpression.test(entry.name))
    .map((entry) => join(folder, entry.name));
}

async function loadImage(path: string): Promise<string> {
  const contents = await readFile(path);
  return contents.toString('base64');
}

async function pickImageFiles(folder: string, howMany: number) {
  if (howMany <= 0) return [];
  const picked: string[] = [];
  const available = await listFolder(folder);
  if (available.length < howMany) return available;
  while (picked.length < howMany) {
    const pickedIndex = Math.ceil(Math.random() * available.length);
    const [pickedFile] = available.splice(pickedIndex, 1);
    picked.push(pickedFile);
  }
  return picked;
}

ipcMain.handle('select-folder', async (): Promise<string | undefined> => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (result.canceled) return;
  return result.filePaths[0];
});

ipcMain.handle('pick-random-images', async (_, folder: string, howMany: number): Promise<string[]> => {
  const picked = await pickImageFiles(folder, howMany);
  console.debug('Picks', JSON.stringify(picked));
  return await Promise.all(picked.map((pick) => loadImage(pick)));
});
