import { ipcRenderer } from 'electron';
import type { Message } from './message';

export function useOpenAi() {
  const ask = async (messages: Message[]): Promise<Message> => {
    return await ipcRenderer.invoke('chat', messages);
  };

  const draw = async (prompt: string): Promise<string> => {
    return await ipcRenderer.invoke('image', prompt);
  };

  return { ask, draw };
}
