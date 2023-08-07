export const ChatGpt = {
  Chat: 'chat',
} as const;

export const StableDiffusionXL = {
  Generate: 'txt2img',
} as const;

export const Vault = {
  GetKeys: 'vault:get-keys',
  SetToken: 'vault:set-token',
} as const;
