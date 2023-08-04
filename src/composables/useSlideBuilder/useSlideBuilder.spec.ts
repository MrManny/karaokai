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
    expect(topic).toEqual(dummyTopic);
  });

  it('should be able to generate slide texts', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValue({ role: 'assistant', content: dummyAnswer });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { generate } = useSlideBuilder();

    // act
    const texts = await generate(dummyTopic);

    // assert
    expect(texts).toMatchObject([
      { type: 'text', prompt: expect.any(String), text: dummyAnswer },
      { type: 'text', prompt: expect.any(String), text: dummyAnswer },
      { type: 'text', prompt: expect.any(String), text: dummyAnswer },
      { type: 'text', prompt: expect.any(String), text: dummyAnswer },
      { type: 'text', prompt: expect.any(String), text: dummyAnswer },
    ]);
  });

  it('should be able to remove trailing puncts in topics', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValueOnce({ role: 'assistant', content: dummyTopic + '.' });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { findTopic } = useSlideBuilder();

    // act
    const topic = await findTopic();

    // assert
    expect(topic).toEqual(dummyTopic);
  });

  it('should be able to remove leading and trailing whitespaces in topics', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValueOnce({ role: 'assistant', content: `  ${dummyTopic}  ` });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { findTopic } = useSlideBuilder();

    // act
    const topic = await findTopic();

    // assert
    expect(topic).toEqual(dummyTopic);
  });

  it('should be able to remove leading and trailing quotes in topics', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValueOnce({ role: 'assistant', content: `"${dummyTopic}"` });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { findTopic } = useSlideBuilder();

    // act
    const topic = await findTopic();

    // assert
    expect(topic).toEqual(dummyTopic);
  });

  it('should be able to remove trailing puncts in slides', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValue({ role: 'assistant', content: dummyAnswer + '.' });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { generate } = useSlideBuilder();

    // act
    const [slide] = await generate(dummyTopic);

    // assert
    expect(slide.text).toEqual(dummyAnswer);
  });

  it('should be able to remove leading and trailing whitespaces in slides', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValue({ role: 'assistant', content: `  ${dummyAnswer}   ` });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { generate } = useSlideBuilder();

    // act
    const [slide] = await generate(dummyTopic);

    // assert
    expect(slide.text).toEqual(dummyAnswer);
  });

  it('should be able to remove leading and trailing quotes in slides', async () => {
    // arrange
    const mockAsk = vi.fn().mockResolvedValue({ role: 'assistant', content: `"${dummyAnswer}"` });
    useOpenAi.mockReturnValue({ ask: mockAsk });
    const { generate } = useSlideBuilder();

    // act
    const [slide] = await generate(dummyTopic);

    // assert
    expect(slide.text).toEqual(dummyAnswer);
  });
});
