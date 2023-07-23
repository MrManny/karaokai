import { ipcRenderer } from 'electron';

export function useVault() {
  const keys = async (): Promise<string[]> => {
    return await ipcRenderer.invoke('vault:get-keys');
  };

  const set = async (name: string, token: string): Promise<void> => {
    await ipcRenderer.invoke('vault:set-token', name, token);
  };

  return { keys, set };
}
