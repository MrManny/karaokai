const DataUriExpression = /^data:image\/(png|webp|jpeg|gif);base64,.+$/;

export type DataUri = `data:${string};base64,${string}`;

export function ensureDataUri(base64Image: string, fallbackMime = 'image/png'): DataUri {
  if (DataUriExpression.test(base64Image)) return base64Image as DataUri;
  console.debug(`Converting to data URI`, { base64Image, fallbackMime });
  return `data:${fallbackMime};base64,${base64Image}`;
}
