import { afterEach, describe, expect, it, vi } from 'vitest';
import { ipcRenderer } from 'electron';
import { useStabilityAi } from './useStabilityAi';

vi.mock('electron', () => ({
  ipcRenderer: {
    invoke: vi.fn(),
  },
}));

describe('useStabilityAi', () => {
  const base64data = 'VGhpcyBpcyBhIHRlc3Q=' as const;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be able to call the backend', async () => {
    // arrange
    const { text2image } = useStabilityAi();
    ipcRenderer.invoke.mockResolvedValueOnce(base64data);

    // act
    const image = await text2image(
      'A beautiful unit test like the world has not seen before, by Russ Mills and Lisa Frank and Alphonse Mucha'
    );

    // assert
    expect(ipcRenderer.invoke).toBeCalledWith(
      'txt2img',
      'A beautiful unit test like the world has not seen before, by Russ Mills and Lisa Frank and Alphonse Mucha'
    );
    expect(image).deep.equals(base64data);
  });
});
