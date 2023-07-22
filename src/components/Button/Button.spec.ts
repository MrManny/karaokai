import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  it('uses a button html tag', () => {
    // arrange
    const wrapper = mount(Button);

    // assert
    expect(wrapper.html()).equals('<button class=""></button>');
  });

  it('can be disabled', () => {
    // arrange
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    // assert
    expect(wrapper.html()).equals('<button disabled="" class=""></button>');
  });

  it('has a primary variant', () => {
    // arrange
    const wrapper = mount(Button, {
      props: {
        disabled: false,
        variant: 'primary',
      },
    });

    // assert
    expect(wrapper.html()).equals('<button class="primary"></button>');
  });

  it('has a disabled primary variant', () => {
    // arrange
    const wrapper = mount(Button, {
      props: {
        disabled: true,
        variant: 'primary',
      },
    });

    // assert
    expect(wrapper.html()).equals('<button disabled="" class="primary"></button>');
  });

  it('has a danger variant', () => {
    // arrange
    const wrapper = mount(Button, {
      props: {
        disabled: false,
        variant: 'danger',
      },
    });

    // assert
    expect(wrapper.html()).equals('<button class="danger"></button>');
  });

  it('has a disabled danger variant', () => {
    // arrange
    const wrapper = mount(Button, {
      props: {
        disabled: true,
        variant: 'danger',
      },
    });

    // assert
    expect(wrapper.html()).equals('<button disabled="" class="danger"></button>');
  });

  it('can mount arbitrary children', () => {
    // arrange
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    });

    // assert
    expect(wrapper.html()).equals('<button class="">Click me</button>');
  });

  it('emits a "click" event when clicked', async () => {
    // arrange
    const wrapper = mount(Button);
    const innerButton = wrapper.find('button');

    // act
    await innerButton.trigger('click');
    await wrapper.vm.$nextTick();

    // assert
    expect(wrapper.emitted('click')?.length).toBe(1);
  });

  it('does not emit a "click" event when clicked while disabled', async () => {
    // arrange
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });
    const innerButton = wrapper.find('button');

    // act
    await innerButton.trigger('click');
    await wrapper.vm.$nextTick();

    // assert
    expect(wrapper.emitted('click')?.length).toBeFalsy();
  });
});
