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
const getLoadDialog = () => screen.queryByTestId('load-dialog');
const getSaveDialog = () => screen.queryByTestId('save-dialog');

const openMenu = async () => {
  const toggle = getShowHideToggle();
  await fireEvent.click(toggle);
};

const expectMenuItemExists = (label: string) => {
  const item = screen.queryByLabelText(label);
  expect(item).not.toBeNull();
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

    // assert
    expectMenuItemExists('API keys');
  });

  it('has a button labeled "Load"', async () => {
    // arrange
    renderComponent(MainActions);

    // act
    await openMenu();

    // assert
    expectMenuItemExists('Load');
  });

  it('has a button labeled "Save"', async () => {
    // arrange
    renderComponent(MainActions);

    // act
    await openMenu();

    // assert
    expectMenuItemExists('Save');
  });

  it('has a button labeled "New (Wizard)"', async () => {
    // arrange
    renderComponent(MainActions);

    // act
    await openMenu();

    // assert
    expectMenuItemExists('New (Wizard)');
  });

  it('emits openEditor when "Editor" is clicked', async () => {
    // arrange
    const { emitted } = renderComponent(MainActions);

    // act
    await openMenu();
    await fireEvent.click(screen.getByText('Editor'));

    // assert
    expect(emitted('openEditor')).toBeDefined();
  });

  it('emits openSettings when "API keys" is clicked', async () => {
    // arrange
    const { emitted } = renderComponent(MainActions);

    // act
    await openMenu();
    await fireEvent.click(screen.getByText('API keys'));

    // assert
    expect(emitted('openSettings')).toBeDefined();
  });

  it('opens the load dialog when "Load" is clicked', async () => {
    // arrange
    renderComponent(MainActions);

    // act
    await openMenu();
    await fireEvent.click(screen.getByText('Load'));

    // assert
    expect(getLoadDialog()).toBeDefined();
  });

  it('opens the save dialog when "Save" is clicked', async () => {
    // arrange
    renderComponent(MainActions);

    // act
    await openMenu();
    await fireEvent.click(screen.getByText('Save'));

    // assert
    expect(getSaveDialog()).toBeDefined();
  });

  it('quits the application when "Quit" is clicked', async () => {
    // arrange
    const { emitted } = renderComponent(MainActions);

    // act
    await openMenu();
    await fireEvent.click(screen.getByText('Quit'));

    // assert
    expect(emitted('exit')).toBeDefined();
  });
});
