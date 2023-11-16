import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderComponent } from '../../utils/test-util';
import { screen, cleanup } from '@testing-library/vue';
import MultilineText from './MultilineText.vue';

const getLines = (...texts: string[]) => texts.map((text) => screen.getByText(text));

describe('MultilineText', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('can split text', () => {
    renderComponent(MultilineText, { text: 'Lorem\nIpsum\n\nDolor\nSit' });
    const expectedLines = getLines('Lorem', 'Ipsum', 'Dolor', 'Sit');

    expect(expectedLines.some((item) => !item)).toBeFalsy();
  });
});
