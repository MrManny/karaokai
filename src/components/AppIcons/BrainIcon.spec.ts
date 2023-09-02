import { describe, expect, it } from 'vitest';
import BrainIcon from './BrainIcon.vue';
import { mount } from '@vue/test-utils';

describe('BrainIcon', () => {
  it('renders as an SVG', () => {
    const wrapper = mount(BrainIcon);

    expect(wrapper.element.tagName).toEqual('svg');
  });
});
