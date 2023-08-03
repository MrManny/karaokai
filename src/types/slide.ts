type ImageMime = 'image/png' | 'image/jpeg' | 'image/webp';
type TextMime = 'text/plain';

export type SlideImage = {
  type: 'image';
  prompt: string;
  mime?: ImageMime;
  base64: string;
};

export type SlideText = {
  type: 'text';
  prompt: string;
  mime?: TextMime;
  text: string;
};

export type SlideContent = SlideImage | SlideText;
