import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderComponent } from '../../utils/test-util';
import { screen, fireEvent, cleanup } from '@testing-library/vue';
import ImageDrop from './ImageDrop.vue';

const getImageDropZone = (): HTMLDivElement => screen.getByTestId('image-drop');

describe('Image Drop', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('can be disabled', () => {
    renderComponent(ImageDrop, { disabled: true });

    const dropZone = getImageDropZone();
    expect(dropZone.classList.contains('disabled')).toBeTruthy();
  });

  it('can show a preview image', () => {
    renderComponent(ImageDrop, { previewImage: 'data:image/png;base64,test' });

    const dropZone = getImageDropZone();
    expect(dropZone.style.backgroundImage).toEqual('url("data:image/png;base64,test")');
  });

  it('becomes "hot" when a PNG is dragged over', async () => {
    renderComponent(ImageDrop);

    await fireEvent.dragOver(getImageDropZone(), {
      dataTransfer: {
        items: [
          {
            type: 'image/png',
          },
        ],
      },
    });

    const dropZone = getImageDropZone();
    expect(dropZone.classList.contains('hot')).toBeTruthy();
    expect(dropZone.classList.contains('reject')).toBeFalsy();
  });

  it('becomes rejecting when a non-image is dragged over', async () => {
    renderComponent(ImageDrop);

    await fireEvent.dragOver(getImageDropZone(), {
      dataTransfer: {
        items: [
          {
            type: 'text/plain',
          },
        ],
      },
    });

    const dropZone = getImageDropZone();
    expect(dropZone.classList.contains('reject')).toBeTruthy();
  });

  it('emits an event when an image is dropped', async () => {
    renderComponent(ImageDrop);

    await fireEvent.drop(getImageDropZone(), {
      dataTransfer: {
        items: [
          {
            type: 'image/png',
            getAsFile: () => new File(['test'], 'image.png', { type: 'image/png' }),
          },
        ],
      },
    });
  });
});
