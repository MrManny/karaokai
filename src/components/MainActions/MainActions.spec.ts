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
    expectMenuItemExists('Settings');
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

  it('has a button labeled "New"', async () => {
    // arrange
    renderComponent(MainActions);

    // act
    await openMenu();

    // assert
    expectMenuItemExists('New');
  });

  it('emits openEditor when "New" is clicked', async () => {
    // arrange
    const { emitted } = renderComponent(MainActions);

    // act
    await openMenu();
    await fireEvent.click(screen.getByText('New'));

    // assert
    expect(emitted('openEditor')).toBeDefined();
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
});
