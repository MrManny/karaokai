import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MainActions from './MainActions.vue';

describe('MainActions', () => {
  it('has a button labeled "Settings"', () => {
    // arrange
    const wrapper = mount(MainActions);
    const button = wrapper.find('button[title="Settings"]');

    // assert
    expect(button.element).toBeDefined();
  });

  it('emits openSettings when "Settings" is clicked', async () => {
    // arrange
    const wrapper = mount(MainActions);
    const button = wrapper.find('button[title="Settings"]');

    // act
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    // assert
    expect(wrapper.emitted('openSettings')).toBeDefined();
  });
});
