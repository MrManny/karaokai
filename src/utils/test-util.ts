import { render } from '@testing-library/vue';
import type { RenderOptions, RenderResult } from '@testing-library/vue';
import PrimeVue from 'primevue/config';

export const defaultPlugins: RenderOptions['global']['plugins'] = [PrimeVue];

export const defaultOptions: RenderOptions = {
  global: {
    plugins: defaultPlugins,
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
