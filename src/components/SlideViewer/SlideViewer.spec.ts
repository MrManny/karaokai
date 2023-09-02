import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderComponent } from '../../utils/test-util';
import { screen, cleanup } from '@testing-library/vue';
import type { Slide } from '../../types/slide-schema';
import SlideViewer from './SlideViewer.vue';

const getSlideText = () => screen.queryByTestId('slide-text');
const getSlide = () => screen.queryByTestId('slide');

describe('SlideViewer', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('accepts a slide', () => {
    const slide: Slide = {
      image: {
        base64: 'data:image/png;base64,test',
      },
      text: {
        text: 'much excitement!',
      },
    };
    renderComponent(SlideViewer, { slide });

    expect(getSlideText().textContent).toEqual('much excitement!');
    expect(getSlide().style.backgroundImage).toEqual('url(data:image/png;base64,test)');
  });
});
