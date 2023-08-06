import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/vue';
import { defaultPlugins, renderComponent } from '../utils/test-util';
import MainLayout from './MainLayout.vue';

describe('MainLayout', () => {
  afterEach(() => {
    cleanup();
  });

  it('has a default slot for content', () => {
    // arrange
    renderComponent(MainLayout, {
      global: {
        plugins: defaultPlugins,
      },
      slots: {
        default: 'Main content goes here!',
      },
    });
    const mainContent = screen.getByText('Main content goes here!');

    // assert
    expect(mainContent).toBeDefined();
  });

  it('has a toolbar with main actions', () => {
    // arrange
    renderComponent(MainLayout);
    const mainActions = screen.getByTestId('main-actions');

    //
    expect(mainActions).toBeDefined();
  });

  it('navigates to the settings when the settings button is clicked', async () => {
    // arrange
    const pushRouteMock = vi.fn();
    renderComponent(MainLayout, {
      global: {
        mocks: {
          $router: {
            push: pushRouteMock,
          },
        },
        plugins: defaultPlugins,
      },
    });
    const settingsButton = screen.getByText('Settings'); // getting a bit integration testy here

    // act
    await fireEvent.click(settingsButton);

    // assert
    expect(pushRouteMock).toHaveBeenCalledWith({ name: 'vault' });
  });
});
