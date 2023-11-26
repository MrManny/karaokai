import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import AiUseMessage from './AiUseMessage.vue';
import Message from 'primevue/message';

describe('AiUseMessage', () => {
  it('displays default message when numOps is 0', () => {
    const wrapper = mount(AiUseMessage, {
      props: { numOps: 0 },
    });
    expect(wrapper.text()).toContain('AI will be used for this.');
  });

  it('displays message for one operation when numOps is 1', () => {
    const wrapper = mount(AiUseMessage, {
      props: { numOps: 1 },
    });
    expect(wrapper.text()).toContain('AI will be used for one operation.');
  });

  it('displays message for multiple operations when numOps is greater than 1', () => {
    const wrapper = mount(AiUseMessage, {
      props: { numOps: 5 },
    });
    expect(wrapper.text()).toContain('AI will be used for 5 operations.');
  });

  it('contains PrimeVue Message component with correct severity', () => {
    const wrapper = mount(AiUseMessage);
    const messageComponent = wrapper.findComponent(Message);
    expect(messageComponent.exists()).toBe(true);
    expect(messageComponent.props('severity')).toBe('info');
    expect(messageComponent.props('closable')).toBe(false);
  });
});
