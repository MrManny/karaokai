import { afterEach, describe, expect, it, vi } from 'vitest';
import SlideEditor from './SlideEditor.vue';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { screen, fireEvent, cleanup } from '@testing-library/vue';
import { renderComponent } from '../../utils/test-util';

vi.mock('../../composables/useSlideBuilder', () => ({
  useSlideBuilder: vi.fn(),
}));

describe('SlideEditor', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  const getTopicInput = (): HTMLInputElement => screen.getByTestId<HTMLInputElement>('topic-input');
  const getRandomTopicButton = () => screen.getByTestId('topic-random-button');
  const clickRandomTopicButton = async () => {
    await fireEvent.click(getRandomTopicButton());
  };

  it('can set a topic', () => {
    // arrange
    useSlideBuilder.mockReturnValue({ findTopic: vi.fn() });
    renderComponent(SlideEditor);
    const input = getTopicInput();

    // assert
    expect(() => fireEvent.update(input, ':D')).not.toThrow();
  });

  it('can generate a topic', async () => {
    // arrange
    const findTopicMock = vi.fn().mockResolvedValue('Cheeseburger');
    useSlideBuilder.mockReturnValue({ findTopic: findTopicMock });
    renderComponent(SlideEditor);

    // act, assert
    await expect(clickRandomTopicButton()).resolves.toBeUndefined();
  });
});
