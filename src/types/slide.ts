type ImageMime = 'image/png' | 'image/jpeg' | 'image/webp';
type TextMime = 'text/plain';

export type SlideImage = {
  prompt?: string;
  mime?: ImageMime;
  base64: string;
};

export type SlideText = {
  prompt?: string;
  mime?: TextMime;
  text: string;
};

export type SlideContent = SlideImage | SlideText;

export type Slide = {
  text?: SlideText;
  image?: SlideImage;
};
