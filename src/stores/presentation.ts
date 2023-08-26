import { defineStore } from 'pinia';
import type { Presentation } from '../types/presentation-schema';
import type { Slide } from '../types/slide-schema';

export const usePresentation = defineStore('presentation', {
  state: () =>
    ({
      topic: '',
      slides: [],
      meta: {},
    }) as Presentation,
  getters: {
    slideCount: (state) => state.slides.length,
  },
  actions: {
    insertEmpty(at: number) {
      const emptySlide: Slide = {
        text: { text: '', prompt: '' },
      };
      const newSlides = [...this.slides];
      newSlides.splice(at, 0, emptySlide);
      this.slides = newSlides;
    },
    load(presentation: Presentation) {
      this.topic = presentation.topic;
      this.slides = presentation.slides;
      this.meta = presentation.meta;
    },
    replace(at: number, newSlide: Slide) {
      const newSlides = [...this.slides];
      newSlides.splice(at, 1, newSlide);
      this.slides = newSlides;
    },
  },
});
