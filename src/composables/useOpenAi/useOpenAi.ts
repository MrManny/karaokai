import { ipcRenderer } from 'electron';
import { Message } from './message';

export function useOpenAi() {
  const ask = async (messages: Message[]): Promise<Message> => {
    return await ipcRenderer.invoke('chat', messages);
  };

  return { ask };
}
