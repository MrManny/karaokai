import { ipcMain } from 'electron';
import { StableDiffusionXL } from './ipc-keys';
import { getCredential } from '../credentials-vault';
import { Json } from '../mimes';
import { responseSchema } from '../stabilityai-schema';
import { retry } from './retry';
import { inspect } from 'util';

type WeightedPrompt = { text: string; weight: number };
function toWeightedPrompts({ positivePrompt, negativePrompt }: Prompt): WeightedPrompt[] {
  const textPrompts: WeightedPrompt[] = [];
  if (positivePrompt) textPrompts.push({ text: positivePrompt, weight: 1 });
  if (negativePrompt) textPrompts.push({ text: negativePrompt, weight: -1 });
  return textPrompts;
}

type Prompt = { positivePrompt: string; negativePrompt: string };
ipcMain.handle(StableDiffusionXL.Generate, async (_, prompt: Prompt) => {
  const token = getCredential('stabilityai');
  if (!token) throw new Error('Token not set');

  const prompts = toWeightedPrompts(prompt);
  if (!prompts.length) throw new Error('No prompts set');
  const requestBody = {
    height: 832,
    width: 1216,
    cfg_scale: 5,
    sampler: 'K_EULER_ANCESTRAL',
    samples: 1,
    steps: 50,
    text_prompts: prompts,
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
