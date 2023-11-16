import { afterEach, describe, expect, it, vi } from 'vitest';
import { useSlideBuilder } from './useSlideBuilder';
import { useOpenAi } from '../useOpenAi';

vi.mock('../useOpenAi', () => ({
  useOpenAi: vi.fn(),
}));

describe('useSlideBuilder', () => {
  const dummyTopic = 'Hot potato';
  const dummyAnswer = 'Unit test me, baby!';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be able to provide a topic', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValueOnce({ role: 'assistant', content: dummyTopic });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { findTopic } = useSlideBuilder();

    // act
    const topic = await findTopic();

    // assert
    expect(mockAsk).toHaveBeenCalled();
    expect(topic).toEqual(dummyTopic);
  });

  it('should be able to generate slide texts', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValueOnce({ role: 'assistant', content: dummyAnswer });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { generateText } = useSlideBuilder();

    // act
    const texts = await generateText(dummyTopic);

    // assert
    expect(mockAsk).toHaveBeenCalled();
    expect(texts).toEqual('Unit test me, baby!');
  });

  it('should be able to generate slide images', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValueOnce({ role: 'assistant', content: dummyAnswer });
    const mockDraw = vi.fn().mockResolvedValueOnce('dGVzdA==');
    useOpenAi.mockReturnValue({ ask: mockAsk, draw: mockDraw });
    const { generateImage } = useSlideBuilder();

    // act
    const texts = await generateImage('Bananas in space!');

    // assert
    expect(mockAsk).toHaveBeenCalled();
    expect(mockDraw).toHaveBeenCalled();
    expect(texts).toEqual('dGVzdA==');
  });
});
