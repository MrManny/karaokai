<script setup lang="ts">
import type { PropType } from 'vue';
import Textarea from 'primevue/textarea';
import type { Slide } from '../../types/slide';
import { useBusy } from '../../composables/useBusy';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import SuggestButton from './SuggestButton.vue';

const { isBusy, op } = useBusy();
const { generateText, generateImage, findImagePrompts } = useSlideBuilder();

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  slide: {
    type: Object as PropType<Slide>,
    default: () => ({}) as Slide,
  },
  topic: {
    type: String,
    default: () => '',
  },
});

const emit = defineEmits(['update:slide']);

const updatePartial = <T extends keyof Slide>(key: T, update: Partial<Slide[T]>) => {
  const oldValue: Slide[T] = props.slide[key];
  const updatedValue: Slide[T] = { ...oldValue, ...update };
  const updatedSlide = { ...props.slide, [key]: updatedValue };
  emit('update:slide', updatedSlide);
};

const setText = (newText?: string) => updatePartial('text', { text: newText ?? '' });
const setImagePrompt = (newPrompt?: string) => updatePartial('image', { prompt: newPrompt ?? '' });
const setImage = (image?: string) => updatePartial('image', { base64: image ?? '', mime: 'image/png' });

const onSuggestText = async () => {
  await op(async () => {
    const text = await generateText(props.topic);
    setText(text);
  });
};

const onSuggestPrompt = async () => {
  if (!props.slide.text?.text) return;
  const { text } = props.slide.text;
  await op(async () => {
    const prompt = await findImagePrompts(text);
    setImagePrompt(prompt);
  });
};

const onGenerateImage = async () => {
  if (!props.slide.image?.prompt) return;
  const { prompt } = props.slide.image;
  await op(async () => {
    const image = await generateImage(prompt);
    setImage(image);
  });
};
</script>

<template>
  <form class="stacked">
    <div>
      <div class="stacked">
        <h2>Text</h2>
        <span class="p-float-label">
          <Textarea
            id="text-input"
            :disabled="disabled"
            :value="slide.text?.text ?? ''"
            @update:modelValue="(value?: string) => setText(value)"
          />
          <label for="text-input">Text</label>
        </span>

        <div class="action-bar">
          <SuggestButton :loading="isBusy" @click="onSuggestText" />
        </div>
      </div>
    </div>

    <div class="stacked">
      <h2>Image</h2>
      <span class="p-float-label">
        <Textarea
          id="image-prompt-input"
          :disabled="disabled"
          :value="slide.image?.prompt ?? ''"
          @update:modelValue="(value?: string) => setImagePrompt(value)"
        />
        <label for="text-input">Image Prompt</label>
      </span>
      <div class="action-bar">
        <SuggestButton :loading="isBusy" @click="onSuggestPrompt" />
        <SuggestButton :disabled="!slide.image?.prompt" :loading="isBusy" @click="onGenerateImage" label="Make image" />
      </div>
    </div>
  </form>
</template>

<style scoped>
.stacked {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-bar {
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-items: stretch;
}

textarea {
  resize: vertical;
  width: 100%;
}
</style>
