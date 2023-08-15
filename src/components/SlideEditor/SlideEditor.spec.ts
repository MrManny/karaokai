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
});
