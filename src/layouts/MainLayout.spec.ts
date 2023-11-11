import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, screen } from '@testing-library/vue';
import { defaultPlugins, renderComponent } from '../utils/test-util';
import MainLayout from './MainLayout.vue';

const pushMock = vi.fn();

vi.mock('../components/MainActions/MainActions.vue');
vi.mock('vue-router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    push: pushMock,
  })),
}));

describe('MainLayout', () => {
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
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
