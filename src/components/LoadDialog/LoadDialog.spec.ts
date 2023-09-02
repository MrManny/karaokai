import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderComponent } from '../../utils/test-util';
import { screen, fireEvent, cleanup } from '@testing-library/vue';
import LoadDialog from './LoadDialog.vue';
import { usePresentation } from '../../stores/presentation';

const loadMock = vi.fn();

vi.mock('../../composables/useIo', () => ({
  useIo: vi.fn(() => ({
    load: loadMock,
  })),
}));

const getUploadButton = (): HTMLDivElement => screen.getByTestId('load-input');
const getInput = (): HTMLInputElement => getUploadButton().querySelector('input[type=file]');

describe('LoadDialog', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('has a control to upload files', () => {
    renderComponent(LoadDialog);

    expect(getUploadButton()).toBeDefined();
  });

  it('can process file uploads', async () => {
    const store = usePresentation();
    const loadPresentationMock = vi.spyOn(store, 'load');
    loadMock.mockResolvedValueOnce({ topic: 'test', slides: [] });

    renderComponent(LoadDialog);

    await fireEvent.update(getInput(), 'test');
    await fireEvent.click(getUploadButton());

    expect(loadMock).toHaveBeenCalled();
    expect(loadPresentationMock).toHaveBeenCalledWith({ slides: [], topic: 'test' });
  });
});
