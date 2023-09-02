import { vi } from 'vitest';
import { render } from '@testing-library/vue';
import type { RenderOptions, RenderResult } from '@testing-library/vue';
import PrimeVue from 'primevue/config';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

export const testingPinia = createTestingPinia({
  createSpy: vi.fn(),
});

export const defaultPlugins: RenderOptions['global']['plugins'] = [PrimeVue, testingPinia];

export const defaultOptions: RenderOptions = {
  global: {
    plugins: defaultPlugins,
    stubs: {
      RouterLink: RouterLinkStub,
    },
  },
};

export function renderComponent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any,
  props: RenderOptions['props'] = {},
  options: Omit<RenderOptions, 'props'> = defaultOptions
): RenderResult {
  const effectiveOptions: RenderOptions = { ...options, props };
  return render(component, effectiveOptions);
}
