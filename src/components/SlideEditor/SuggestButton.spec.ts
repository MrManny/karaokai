import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, cleanup } from '@testing-library/vue';
import { renderComponent } from '../../utils/test-util';
import SuggestButton from './SuggestButton.vue';

const getToggleButton = () => screen.getByTestId('suggest-toggle');

describe('SuggestButton', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('can be disabled', () => {
    renderComponent(SuggestButton, { disabled: true });

    expect(getToggleButton().getAttribute('disabled')).toBeDefined();
  });
});
