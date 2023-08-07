import { ipcMain } from 'electron';
import { StableDiffusionXL } from './ipc-keys';
import { getCredential } from './credentials-vault';
import { Json } from './mimes';
import { responseSchema } from './stabilityai-schema';
import { retry } from './retry';
import { inspect } from 'util';

ipcMain.handle(StableDiffusionXL.Generate, async (_, prompt: string) => {
  const token = getCredential('stabilityai');
  if (!token) throw new Error(`Token not set`);

  const requestBody = {
    height: 832,
    width: 1216,
    cfg_scale: 5,
    sampler: 'K_EULER_ANCESTRAL',
    samples: 1,
    steps: 50,
    text_prompts: [{ text: prompt, weight: 1 }],
  };

  const get = async () => {
    const url = `https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: Json,
        Authorization: `Bearer ${token}`,
        'Content-Type': Json,
      },
      body: JSON.stringify(requestBody),
    });
    const payload = await response.json();
    if (response.status >= 300) {
      console.error(inspect(payload));
      throw new Error(`Response was ${response.status}: ${response.statusText}`);
    }
    return responseSchema.parse(payload);
  };
  const { artifacts } = await retry(get);
  const [choice] = artifacts;
  if (choice.finishReason !== 'SUCCESS') {
    throw new Error(`Image generation halted with reason: ${choice.finishReason}`);
  }

  return choice.base64;
});
