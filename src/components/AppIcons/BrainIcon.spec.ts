import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BrainIcon from './BrainIcon.vue';

describe('BrainIcon', () => {
  it('renders as an SVG', () => {
    const wrapper = mount(BrainIcon);

    expect(wrapper.element.tagName).toEqual('SVG');
  });
});
