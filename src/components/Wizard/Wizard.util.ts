import { ipcRenderer } from 'electron';

export async function loadBackupImages(path: string, howMany: number): Promise<string[]> {
  if (howMany <= 0) return [];
  return await ipcRenderer.invoke('pick-random-images', path, howMany);
}

function* range(toExcl: number): Generator<number> {
  for (let i = 0; i < toExcl; i++) yield i;
}

export function pickRandomNumbers(howMany: number, toExcl: number): number[] {
  const available: number[] = Array.from(range(toExcl));
  if (howMany >= toExcl) return available;

  const picked: number[] = [];
  while (picked.length < howMany) {
    const pickedIndex = Math.ceil(Math.random() * available.length);
    const [pickedValue] = available.splice(pickedIndex, 1);
    picked.push(pickedValue);
  }
  return picked;
}
