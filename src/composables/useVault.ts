import { ipcRenderer } from 'electron';

export const enum TokenName {
  OpenAi = 'openai',
  StabilityAi = 'stabilityai',
}

export function useVault() {
  const keys = async (): Promise<string[]> => {
    return await ipcRenderer.invoke('vault:get-keys');
  };

  const set = async (name: TokenName, token: string): Promise<void> => {
    await ipcRenderer.invoke('vault:set-token', name, token);
  };

  return { keys, set };
}
