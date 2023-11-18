<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { useBusy } from '../../composables/useBusy';
import SuggestButton from './SuggestButton.vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  topic: {
    type: String,
    default: '',
  },
  topicPrompt: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:topic']);

const { findTopic } = useSlideBuilder();
const { isBusy, op } = useBusy();
const topic = ref<string>(props.topic);

const suggestTopic = async () => {
  await op(async () => {
    topic.value = await findTopic();
  });
};
</script>

<template>
  <div class="p-inputgroup">
    <InputText
      aria-labelledby="topic"
      data-testid="topic-input"
      placeholder="Topic"
      required
      v-model.trim="topic"
      :disabled="disabled"
      @blur="emit('update:topic', topic)"
    />
    <SuggestButton :loading="isBusy" :disabled="disabled" :initial-prompt="topicPrompt" @suggest="suggestTopic" />
  </div>
</template>

<style scoped></style>
