import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Brand from './Brand.vue';

describe('Brand', () => {
  it('is a defined, SVG-based component', () => {
    // arrange
    const wrapper = mount(Brand);

    // assert
    expect(wrapper.html()).toContain('<svg');
  });

  it('has an ARIA label', () => {
    // arrange
    const wrapper = mount(Brand);
    const aria = wrapper.find('[aria-label]');

    // assert
    expect(aria).toBeDefined();
  });
});
