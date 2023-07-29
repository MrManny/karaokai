import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import KeyInput from './KeyInput.vue';

describe('KeyInput', () => {
  it('is an input field of type password', () => {
    // arrange
    const wrapper = mount(KeyInput);
    const html = wrapper.html();

    // assert
    expect(html).contains('<input');
    expect(html).contains('type="password"');
  });

  it('can be disabled', () => {
    // arrange
    const wrapper = mount(KeyInput, {
      props: {
        disabled: true,
      },
    });

    // assert
    expect(wrapper.html()).contains('disabled');
  });

  it('can have a label', () => {
    // arrange
    const wrapper = mount(KeyInput, {
      props: {
        label: 'Bananas are great',
      },
    });

    // assert
    expect(wrapper.html()).contains('Bananas are great');
  });

  it('can have an id', () => {
    // arrange
    const wrapper = mount(KeyInput, {
      props: {
        id: 'fruit',
      },
    });

    // assert
    expect(wrapper.html()).contains('id="fruit"');
  });

  it('can have a placeholder', () => {
    // arrange
    const wrapper = mount(KeyInput, {
      props: {
        placeholder: 'Enter your favorite type of ice cream',
      },
    });

    // assert
    expect(wrapper.html()).contains('placeholder="Enter your favorite type of ice cream"');
  });

  it('can have a required attribute', () => {
    // arrange
    const wrapper = mount(KeyInput, {
      props: {
        required: true,
      },
    });

    // assert
    expect(wrapper.html()).contains('required');
  });

  it('can has an indicator for being set', () => {
    // arrange
    const wrapper = mount(KeyInput, {
      props: {
        set: true,
      },
    });

    // assert
    expect(wrapper.html()).contains('class="set"');
  });

  it('emits "update:value" on input', async () => {
    // arrange
    const wrapper = mount(KeyInput);
    const innerInput = wrapper.find('input');

    // act
    await innerInput.setValue('strawberry');
    await wrapper.vm.$nextTick();

    // assert
    expect(wrapper.emitted('update:value')?.length).toBe(1);
  });
});
