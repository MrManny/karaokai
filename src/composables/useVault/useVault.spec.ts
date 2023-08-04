import { afterEach, describe, expect, it, vi } from 'vitest';
import { ipcRenderer } from 'electron';
import { TokenName, useVault } from './useVault';

vi.mock('electron', () => ({
  ipcRenderer: {
    invoke: vi.fn(),
  },
}));

describe('useVault', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be able to retrieve which keys are set', async () => {
    // arrange
    const { keys } = useVault();
    ipcRenderer.invoke.mockResolvedValueOnce(['test', 'key']);

    // act
    const response = await keys();

    // assert
    expect(ipcRenderer.invoke).toBeCalled();
    expect(response).deep.equals(['test', 'key']);
  });

  it('should be able to set a key', async () => {
    // arrange
    const { set } = useVault();
    ipcRenderer.invoke.mockResolvedValueOnce();

    // act
    await set(TokenName.StabilityAi, '0xc0ff33');

    // assert
    expect(ipcRenderer.invoke).toBeCalledWith('vault:set-token', TokenName.StabilityAi, '0xc0ff33');
  });
});
