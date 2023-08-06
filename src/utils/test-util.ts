import { render } from '@testing-library/vue';
import type { RenderOptions, RenderResult } from '@testing-library/vue';
import PrimeVue from 'primevue/config';

const defaultOptions: RenderOptions = {
  global: {
    plugins: [PrimeVue],
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderComponent(component: any, options: RenderOptions = {}): RenderResult {
  const effectiveOptions = { ...defaultOptions, options };
  return render(component, effectiveOptions);
}
