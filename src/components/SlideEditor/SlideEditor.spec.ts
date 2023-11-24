import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SlideEditor from './SlideEditor.vue';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { screen, fireEvent, cleanup } from '@testing-library/vue';
import { renderComponent } from '../../utils/test-util';
import { createPinia, setActivePinia } from 'pinia';
import { usePresentation } from '../../stores/presentation';

vi.mock('../../composables/useSlideBuilder', () => ({
  useSlideBuilder: vi.fn(),
}));

const getTopicInput = (): HTMLInputElement => screen.getByTestId<HTMLInputElement>('topic-input');
const getPreviousButton = (): HTMLButtonElement => screen.getByLabelText('Previous');
const getNextButton = (): HTMLButtonElement => screen.getByLabelText('Next');
const getNewSlideButton = (): HTMLButtonElement => screen.getByLabelText('New');
const getPlayButton = (): HTMLButtonElement => screen.getByLabelText('Play');

describe('SlideEditor', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    usePresentation().$state = {
      slides: [
        {
          text: { text: 'Hello world!' },
        },
        {
          image: { base64: '01234' },
        },
        {
          text: { text: 'Lorem ipsum' },
          image: { base64: 'dolorsit' },
        },
      ],
      topic: 'A test well tested',
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('can set a topic', async () => {
    // arrange
    useSlideBuilder.mockReturnValue({ findTopic: vi.fn() });
    renderComponent(SlideEditor);
    const input = getTopicInput();

    // act
    await fireEvent.update(input, 'test');

    // assert
    expect(getTopicInput().value).toEqual('test');
  });

  it('has a "previous" button', () => {
    renderComponent(SlideEditor);

    expect(getPreviousButton()).toBeDefined();
  });

  it('has a "next" button', () => {
    renderComponent(SlideEditor);

    expect(getNextButton()).toBeDefined();
  });

  it('has a "play" button', () => {
    renderComponent(SlideEditor);

    expect(getPlayButton()).toBeDefined();
  });

  it('clicking "play" emits an event', async () => {
    const { emitted } = renderComponent(SlideEditor);

    await fireEvent.click(getPlayButton());

    const emittedPlay = emitted('play');
    expect(emittedPlay).toHaveLength(1);
  });

  it('has a "new slide" button', () => {
    renderComponent(SlideEditor);

    expect(getNewSlideButton()).toBeDefined();
  });
});
