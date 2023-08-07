import { ipcRenderer } from 'electron';

export function useStabilityAi() {
  const text2image = async (prompt: string): Promise<string> => {
    return await ipcRenderer.invoke('txt2img', prompt);
  };

  return { text2image };
}
