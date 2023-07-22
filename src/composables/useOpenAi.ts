import type { Message } from '../../electron/main/openai-schema';
import { ipcRenderer } from 'electron';
import { ref } from 'vue';

export function useOpenAi() {
  const memory = ref<Message[]>([]);

  const chat = async (ask: string, as: Message['role'] = 'user') => {
    const message: Message = { role: as, content: ask };
    const memoryCopy = memory.value.map(({ role, content }) => ({ role, content }));
    const messages: Message[] = [...memoryCopy, message];
    const response: Message = await ipcRenderer.invoke('chat', messages);
    memory.value = [...messages, response];
    return response;
  };

  const reset = () => {
    memory.value = [];
  };

  return { chat, reset, memory };
}
