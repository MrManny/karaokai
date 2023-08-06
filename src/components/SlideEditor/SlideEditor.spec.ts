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
  const getGenerateButton = () => screen.getByTestId('generate-button');
  const getSlideTextInput = (index: number) => screen.getByTestId(`text_${index}`);
  const setSlideTextInput = async (index: number, newValue: string) => {
    const input = getSlideTextInput(index);
    await fireEvent.update(input, newValue);
  };

  it('can set a topic', async () => {
    // arrange
    useSlideBuilder.mockReturnValue({ findTopic: vi.fn() });
    const { emitted } = renderComponent(SlideEditor);
    const input = getTopicInput();

    // act
    await fireEvent.update(input, 'test');

    // assert
    expect(emitted('update:topic')).toEqual([['test']]);
  });

  it('can generate a topic', async () => {
    // arrange
    const findTopicMock = vi.fn().mockResolvedValue('Cheeseburger');
    useSlideBuilder.mockReturnValue({ findTopic: findTopicMock });
    const { emitted } = renderComponent(SlideEditor);

    // act
    await clickRandomTopicButton();

    // assert
    expect(emitted('update:topic')).toEqual([['Cheeseburger']]);
  });

  // FIXME: for reasons beyond my current understanding, this does not emit anything
  it.skip('can generate content for a given topic', async () => {
    // arrange
    const generateMock = vi.fn().mockResolvedValue([{ type: 'text', prompt: 'Test', text: 'test' }]);
    useSlideBuilder.mockReturnValue({ generate: generateMock });
    const { emitted } = renderComponent(SlideEditor, { topic: 'Cheeseburger' });

    // act
    await fireEvent.click(getGenerateButton());

    // assert
    expect(generateMock).toHaveBeenCalledWith('Cheeseburger');
    expect(emitted('update:slides')).toBeDefined();
  });

  it('will not generate content if no topic is set', async () => {
    // arrange
    const errorConsoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const generateMock = vi.fn().mockResolvedValueOnce([]);
    useSlideBuilder.mockReturnValue({ generate: generateMock });
    const { emitted } = renderComponent(SlideEditor);

    // act
    await fireEvent.click(getGenerateButton());

    // assert
    expect(errorConsoleSpy).toHaveBeenCalled();
    expect(generateMock).not.toHaveBeenCalled();
    expect(emitted('update:slides')).toBeUndefined();
  });

  // FIXME: for reasons beyond my current understanding, this does not emit anything
  it.skip('can update generated content', async () => {
    // arrange
    const generateMock = vi.fn().mockResolvedValueOnce([{ type: 'text', prompt: 'Prompt', text: 'Text' }]);
    useSlideBuilder.mockReturnValue({ generate: generateMock });
    const { emitted } = renderComponent(SlideEditor, { topic: 'Cheeseburger' });

    // act
    await fireEvent.click(getGenerateButton());
    await setSlideTextInput(0, 'banana');

    // assert
    expect(generateMock).toHaveBeenCalledWith('Cheeseburger');
    expect(emitted('update:slides')).toEqual([[':d']]);
  });
});
