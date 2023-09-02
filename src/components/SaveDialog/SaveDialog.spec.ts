import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderComponent } from '../../utils/test-util';
import { screen, fireEvent, cleanup } from '@testing-library/vue';
import SaveDialog from './SaveDialog.vue';

const saveMock = vi.fn();
vi.mock('../../composables/useIo', () => ({
  useIo: vi.fn(() => ({
    save: saveMock,
  })),
}));

const getFilenameInput = (): HTMLInputElement => screen.getByTestId('filename-input');
const getSaveButton = (): HTMLButtonElement => screen.getByLabelText('Save');

describe('SaveDialog', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('has a control to set file names', () => {
    renderComponent(SaveDialog);

    expect(getFilenameInput().value).toEqual('presentation.json');
  });

  it('can set the file name', async () => {
    renderComponent(SaveDialog);

    await fireEvent.update(getFilenameInput(), 'myPresentation.json');
    await fireEvent.click(getSaveButton());

    expect(saveMock).toHaveBeenCalledWith('myPresentation.json', { meta: expect.anything(), slides: [], topic: '' });
  });
});
