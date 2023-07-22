import { ipcMain } from 'electron';
import type { Message } from './openai-schema';
import { responseSchema } from './openai-schema';
import { Json } from './mimes';
import { getCredential } from './credentials-vault';

const Chat = 'chat' as const;

ipcMain.handle(Chat, async (_, messages: Message[]) => {
  const token = getCredential('openai');
  if (!token) throw new Error(`Token not set`);

  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages,
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Accept: Json,
      Authorization: `Bearer ${token}`,
      'Content-Type': Json,
    },
    body: JSON.stringify(requestBody),
  });
  if (response.status >= 300) throw new Error(`Response was ${response.status}: ${response.statusText}`);
  const payload = await response.json();
  const fullResponse = responseSchema.parse(payload);
  return fullResponse.choices[0].message;
});
