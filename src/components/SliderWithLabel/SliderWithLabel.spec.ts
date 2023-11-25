import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SliderWithLabel from './SliderWithLabel.vue'; // Adjust the import path as needed
import Slider from 'primevue/slider';
import { nextTick } from 'vue';

describe('SliderWithLabel', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(SliderWithLabel);
    expect(wrapper.find('.slider').exists()).toBe(true);
    const slider = wrapper.findComponent(Slider);
    expect(slider.props('disabled')).toBe(false);
    expect(slider.props('min')).toBe(0);
    expect(slider.props('max')).toBe(100);
    expect(slider.props('modelValue')).toBe(0);
  });

  it('accepts and passes down props correctly', () => {
    const wrapper = mount(SliderWithLabel, {
      props: {
        disabled: true,
        min: 10,
        max: 50,
        modelValue: 20,
      },
    });
    const slider = wrapper.findComponent(Slider);
    expect(slider.props('disabled')).toBe(true);
    expect(slider.props('min')).toBe(10);
    expect(slider.props('max')).toBe(50);
    expect(slider.props('modelValue')).toBe(20);
  });

  it('emits update:modelValue event when slider value changes', async () => {
    const wrapper = mount(SliderWithLabel);
    const slider = wrapper.findComponent(Slider);
    slider.vm.$emit('update:modelValue', 30);
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([30]);
  });

  it('displays the current value of the slider', () => {
    const wrapper = mount(SliderWithLabel, {
      props: { modelValue: 25 },
    });
    expect(wrapper.text()).toContain('25');
  });
});
