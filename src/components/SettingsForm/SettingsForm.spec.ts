import { describe, expect, it } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import SettingsForm from './SettingsForm.vue';
import PrimeVue from 'primevue/config';
import type InputText from 'primevue/inputtext';
import Button from 'primevue/button';

describe('SettingsForm', () => {
  const getOpenAiInput = (wrapper: VueWrapper) => wrapper.getComponent<InputText>('#openAiKey');
  const getSaveButton = (wrapper: VueWrapper) => wrapper.getComponent<Button>(Button);

  it('emits an update when the OpenAI key is set', async () => {
    // arrange
    const wrapper = shallowMount(SettingsForm, {
      global: {
        plugins: [PrimeVue],
      },
    });

    // act
    const input = getOpenAiInput(wrapper);
    await input.setValue('c0ff33');

    // assert
    const [emitted] = wrapper.emitted('update:openAiKey');
    expect(emitted).toMatchObject(['c0ff33']);
  });

  it('emits a save event when Save is pushed', async () => {
    // arrange
    const wrapper = shallowMount(SettingsForm, {
      global: {
        plugins: [PrimeVue],
      },
    });

    // act
    await getSaveButton(wrapper).trigger('click');

    // assert
    expect(wrapper.emitted()).toHaveProperty('save');
  });
});
