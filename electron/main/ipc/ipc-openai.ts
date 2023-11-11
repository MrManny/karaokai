import { ipcMain } from 'electron';
import { getCredential } from '../credentials-vault';
import OpenAI from 'openai';
import { ChatCompletionSnapshot } from 'openai/lib/ChatCompletionStream';
import Message = ChatCompletionSnapshot.Choice.Message;
import sharp from 'sharp';

function getTokenOrThrow(): string {
  const token = getCredential('openai');
  if (!token) throw new Error(`Token not set`);
  return token;
}

function createClient(): OpenAI {
  const token = getTokenOrThrow();
  return new OpenAI({ apiKey: token });
}

ipcMain.handle('chat', async (_, messages: Message[]) => {
  const openai = createClient();
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: false,
    messages,
  });
  const [firstChoice] = response.choices;

  return firstChoice.message;
});

ipcMain.handle('image', async (_, prompt: string) => {
  const openai = createClient();
  const response = await openai.images.generate({
    prompt,
    model: 'dall-e-3',
    n: 1,
    size: '1792x1024',
    response_format: 'b64_json',
  });
  const [image] = response.data;
  const pngImageBuffer = Buffer.from(image.b64_json ?? '', 'base64');
  const webpImageBuffer = await sharp(pngImageBuffer)
    .resize({ width: 1280, height: 720, fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer();
  return webpImageBuffer.toString('base64');
});
