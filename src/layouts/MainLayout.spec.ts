import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, screen } from '@testing-library/vue';
import { defaultPlugins, renderComponent } from '../utils/test-util';
import MainLayout from './MainLayout.vue';

vi.mock('../components/MainActions/MainActions.vue');

describe('MainLayout', () => {
  afterEach(() => {
    cleanup();
  });

  it('has a default slot for content', () => {
    // arrange
    renderComponent(
      MainLayout,
      {},
      {
        global: {
          plugins: defaultPlugins,
        },
        slots: {
          default: 'Main content goes here!',
        },
      }
    );
    const mainContent = screen.getByText('Main content goes here!');

    // assert
    expect(mainContent).toBeDefined();
  });
});
