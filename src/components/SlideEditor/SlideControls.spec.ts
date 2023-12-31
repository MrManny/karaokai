import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderComponent } from '../../utils/test-util';
import { screen, fireEvent, cleanup } from '@testing-library/vue';
import SlideControls from './SlideControls.vue';

vi.mock('../../composables/useSlideBuilder', () => ({
  useSlideBuilder: vi.fn().mockImplementation(() => ({
    generateText: vi.fn(),
    generateImage: vi.fn(),
    findImagePrompts: vi.fn(),
  })),
}));

const getTopic = () => screen.getByTestId('topic');
const getTextInput = () => screen.getByTestId<HTMLTextAreaElement>('text-input');

describe('SlideControls', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('can be disabled', () => {
    // arrange
    renderComponent(SlideControls, {
      disabled: true,
    });

    // assert
    expect(getTextInput().getAttribute('disabled')).toBeDefined();
  });

  it('displays a slide', () => {
    // arrange
    renderComponent(SlideControls, {
      slide: {
        text: {
          text: 'My text',
          prompt: 'A test text prompt',
        },
        image: {
          base64: 'data:image/png;base64,test',
          prompt: 'A test image',
        },
      },
    });
    const textInput = getTextInput();

    // assert
    expect(textInput).toHaveProperty('value', 'My text');
  });

  it('accepts a topic', () => {
    renderComponent(SlideControls, {
      topic: 'My awesome topic',
    });

    expect(getTopic().textContent).toEqual('My awesome topic');
  });

  it('emits an event when the slide text changed', () => {
    const { emitted } = renderComponent(SlideControls, {
      topic: 'My awesome topic',
      slide: {
        text: {
          text: 'Lorem ipsum',
          prompt: '',
        },
      },
    });

    fireEvent.update(getTextInput(), 'Another topic!');

    expect(emitted()['update:slide']).toEqual([[{ text: { text: 'Another topic!', prompt: '' } }]]);
  });
});
