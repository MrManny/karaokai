import { afterEach, describe, expect, it, vi } from 'vitest';
import MainActions from './MainActions.vue';
import { cleanup } from '@testing-library/vue';
import { screen, fireEvent } from '@testing-library/vue';
import { renderComponent } from '../../utils/test-util';

const routerPushMock = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

const getShowHideToggle = () => {
  return screen.getByLabelText('File');
};

const openMenu = async () => {
  const toggle = getShowHideToggle();
  await fireEvent.click(toggle);
};

describe('MainActions', () => {
  afterEach(() => {
    cleanup();
  });

  it('has a button labeled "Settings"', async () => {
    // arrange
    renderComponent(MainActions);

    // act
    await openMenu();
    const button = screen.getByText('Settings');

    // assert
    expect(button).toBeDefined();
  });

  it('emits openSettings when "Settings" is clicked', async () => {
    // arrange
    const { emitted } = renderComponent(MainActions);

    // act
    await openMenu();
    await fireEvent.click(screen.getByText('Settings'));

    // assert
    expect(emitted('openSettings')).toBeDefined();
  });
});
