import { ipcRenderer } from 'electron';
import type { StyledPrompt } from '../useSlideBuilder/styles';

export function useStabilityAi() {
  const text2image = async (prompt: StyledPrompt): Promise<string> => {
    return await ipcRenderer.invoke('txt2img', prompt);
  };

  return { text2image };
}
