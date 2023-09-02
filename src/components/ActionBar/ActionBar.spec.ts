import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionBar from './ActionBar.vue';

describe('ActionBar', () => {
  it('has a slot to host actions', () => {
    const wrapped = mount(ActionBar, {
      slots: {
        default: '<div>Test test</div>',
      },
    });

    expect(wrapped.html()).toContain('<div>Test test</div>');
  });
});
