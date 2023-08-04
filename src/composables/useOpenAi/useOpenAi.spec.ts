import { afterEach, describe, expect, it, vi } from 'vitest';
import { ipcRenderer } from 'electron';
import { useOpenAi } from './useOpenAi';

vi.mock('electron', () => ({
  ipcRenderer: {
    invoke: vi.fn(),
  },
}));

describe('useOpenAi', () => {
  const assistantMessage = (text: string) => ({ role: 'assistant', content: text });
  const userMessage = (text: string) => ({ role: 'user', content: text });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be able to ask a question', async () => {
    // arrange
    const { ask } = useOpenAi();
    ipcRenderer.invoke.mockResolvedValueOnce(assistantMessage('Bob'));

    // act
    const response = await ask([userMessage('What is your name?')]);

    // assert
    expect(ipcRenderer.invoke).toBeCalledWith('chat', [{ role: 'user', content: 'What is your name?' }]);
    expect(response).deep.equals(assistantMessage('Bob'));
  });

  it('should be able to send a series of messages', async () => {
    // arrange
    const history = [
      userMessage('What is your name?'),
      assistantMessage('Mihi nomen est Bob.'),
      userMessage('Is that Latin or something?'),
      assistantMessage('Maybe.'),
      userMessage('Cool beans.'),
    ];
    const { ask } = useOpenAi();
    ipcRenderer.invoke.mockResolvedValueOnce(assistantMessage('It *is* cool beans!'));

    // act
    const response = await ask(history);

    // assert
    expect(ipcRenderer.invoke).toBeCalledWith('chat', history);
    expect(response).deep.equals(assistantMessage('It *is* cool beans!'));
  });
});
