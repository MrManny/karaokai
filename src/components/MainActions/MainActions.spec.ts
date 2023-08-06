import { afterEach, describe, expect, it } from 'vitest';
import MainActions from './MainActions.vue';
import { cleanup } from '@testing-library/vue';
import { screen, fireEvent } from '@testing-library/vue';
import { renderComponent } from '../../utils/test-util';

describe('MainActions', () => {
  afterEach(() => {
    cleanup();
  });

  it('has a button labeled "Settings"', () => {
    // arrange
    renderComponent(MainActions);
    const button = screen.getByText('Settings');

    // assert
    expect(button).toBeDefined();
  });

  it('emits openSettings when "Settings" is clicked', async () => {
    // arrange
    const { emitted } = renderComponent(MainActions);
    const button = screen.getByText('Settings');

    // act
    await fireEvent.click(button);

    // assert
    expect(emitted('openSettings')).toBeDefined();
  });
});
