import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIo } from './useIo';
import { sleep } from '../../utils/test-util';

const readAsTextMock = vi.fn();
vi.spyOn(window, 'FileReader').mockImplementation(() => ({
  DONE: FileReader.DONE,
  EMPTY: FileReader.EMPTY,
  LOADING: FileReader.LOADING,
  readyState: 0,
  error: (FileReader['error'] = null),
  result: 'this is the result',
  abort: vi.fn(),
  addEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  onabort: vi.fn(),
  onerror: vi.fn(),
  onload: vi.fn(),
  onloadend: vi.fn(),
  onloadprogress: vi.fn(),
  onloadstart: vi.fn(),
  onprogress: vi.fn(),
  readAsArrayBuffer: vi.fn(),
  readAsBinaryString: vi.fn(),
  readAsDataURL: vi.fn(),
  readAsText: readAsTextMock,
  removeEventListener: vi.fn(),
}));

describe('useIo', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('can load data', async () => {
    const { load } = useIo();

    void load(new File(['test'], 'test.txt', { type: 'text/plain' }));
    await sleep(100);

    expect(readAsTextMock).toHaveBeenCalledWith(expect.any(File), 'utf-8');
  });

  it('can save data', () => {
    window.URL.createObjectURL = vi.fn().mockReturnValue('data:text/plain;base64,test');
    window.URL.revokeObjectURL = vi.fn();

    const presentation = { topic: 'Potassium in bananas', slides: [], meta: {} };
    const { save } = useIo();
    const appendSpy = vi.spyOn(document.body, 'append');
    vi.spyOn(document, 'removeChild').mockImplementation((child) => child);

    save('test.json', presentation);

    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
  });
});
