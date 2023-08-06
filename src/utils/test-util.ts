import { render } from '@testing-library/vue';
import type { RenderOptions, RenderResult } from '@testing-library/vue';
import PrimeVue from 'primevue/config';

export const defaultPlugins: RenderOptions['global']['plugins'] = [PrimeVue];

const defaultOptions: RenderOptions = {
  global: {
    plugins: defaultPlugins,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderComponent(component: any, options: RenderOptions = defaultOptions): RenderResult {
  return render(component, options);
}
