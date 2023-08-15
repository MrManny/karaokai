export type SlideImage = {
  prompt?: string;
  base64: string;
};

export type SlideText = {
  prompt?: string;
  text: string;
};

export type Slide = {
  text?: SlideText;
  image?: SlideImage;
};
