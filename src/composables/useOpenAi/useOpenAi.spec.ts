import { afterEach, describe, expect, it, vi } from 'vitest';
import { ipcRenderer } from 'electron';
import { useOpenAi } from './useOpenAi';

vi.mock('electron', () => ({
  ipcRenderer: {
    invoke: vi.fn(),
  },
}));

describe('useOpenAi', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be able to send a message', async () => {
    // arrange
    const { chat } = useOpenAi();
    ipcRenderer.invoke.mockResolvedValueOnce({ role: 'assistant', content: 'Bob' });

    // act
    const response = await chat('What is your name?');

    // assert
    expect(ipcRenderer.invoke).toBeCalledWith('chat', [{ role: 'user', content: 'What is your name?' }]);
    expect(response).deep.equals('Bob');
  });

  it('retains memory', async () => {
    // arrange
    const { chat, memory } = useOpenAi();
    ipcRenderer.invoke.mockResolvedValue({ role: 'assistant', content: 'Exactly.' });

    // act
    await chat('Bow ties are cool.');
    await chat('Ties suck.');

    // assert
    expect(memory.value).deep.equals([
      {
        content: 'Bow ties are cool.',
        role: 'user',
      },
      {
        content: 'Exactly.',
        role: 'assistant',
      },
      {
        content: 'Ties suck.',
        role: 'user',
      },
      {
        content: 'Exactly.',
        role: 'assistant',
      },
    ]);
  });

  it('can clear its memory', async () => {
    // arrange
    const { chat, memory, reset } = useOpenAi();
    ipcRenderer.invoke.mockResolvedValue({ role: 'assistant', content: 'Exactly.' });

    // act
    await chat('Bow ties are cool.');
    reset();
    await chat('Ties suck.');

    // assert
    expect(memory.value).deep.equals([
      {
        content: 'Ties suck.',
        role: 'user',
      },
      {
        content: 'Exactly.',
        role: 'assistant',
      },
    ]);
  });
});
