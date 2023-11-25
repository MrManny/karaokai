import { ipcRenderer } from 'electron';

export const enum TokenName {
  OpenAi = 'openai',
}

export function useVault() {
  const has = async (name: TokenName): Promise<boolean> => {
    const availableKeys = await keys();
    return availableKeys.includes(name);
  };

  const keys = async (): Promise<string[]> => {
    return await ipcRenderer.invoke('vault:get-keys');
  };

  const set = async (name: TokenName, token: string): Promise<void> => {
    await ipcRenderer.invoke('vault:set-token', name, token);
  };

  return { has, keys, set };
}
