import { afterEach, describe, expect, it, vi } from 'vitest';
import { useElectron } from './useElectron';
import { ipcRenderer } from 'electron';

vi.mock('electron', () => ({
  ipcRenderer: {
    send: vi.fn(),
  },
}));

describe('useElectron', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should send a "quit" event to Electron when calling "quit"', () => {
    const { quit } = useElectron();

    quit();

    expect(ipcRenderer.send).toHaveBeenCalledWith('quit');
  });
});
