<script setup lang="ts">
import type { PropType } from 'vue';
import type { Slide } from '../../types/slide-schema';
import Textarea from 'primevue/textarea';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useBusy } from '../../composables/useBusy';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import SuggestButton from './SuggestButton.vue';
import ImageDrop from './ImageDrop.vue';
import { computed } from 'vue';
import StackedLayout from '../../layouts/StackedLayout.vue';
import { ensureDataUri } from '../../utils/img-util';

const { isBusy, op } = useBusy();
const { generateText, generateImage } = useSlideBuilder();

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

const emit = defineEmits(['update:slide', 'remove']);
const imagePreview = computed(() => props.slide.image?.base64 ?? '');

const updatePartial = <T extends keyof Slide>(key: T, update: Partial<Slide[T]>) => {
  const oldValue: Slide[T] = props.slide[key];
  const updatedValue: Slide[T] = { ...oldValue, ...update };
  const updatedSlide = { ...props.slide, [key]: updatedValue };
  emit('update:slide', updatedSlide);
};

const setText = (newText?: string) => updatePartial('text', { text: newText ?? '' });
const setImage = (image?: string) => updatePartial('image', { base64: image ?? '' });

const onSuggestText = async () => {
  await op(async () => {
    const text = await generateText(props.topic);
    setText(text);
  });
};

const canSuggestImage = computed(() => !!props.slide.text && !!props.slide.text.text);

const onSuggestImage = async () => {
  if (!canSuggestImage.value) return;
  await op(async () => {
    const image = await generateImage(props.slide.text?.text ?? '');
    console.debug('Image generated', { image });
    const dataUri = ensureDataUri(image);
    setImage(dataUri);
  });
};
</script>

<template>
  <form>
    <StackedLayout>
      <Card>
        <template #title> Topic </template>
        <template #subtitle> This is your chosen topic: </template>
        <template #content>
          <span data-testid="topic">
            {{ topic }}
          </span>
        </template>
      </Card>

      <Card data-testid="text">
        <template #title> Text </template>
        <template #subtitle> Enter text for your slide. </template>
        <template #content>
          <Textarea
            id="text-input"
            data-testid="text-input"
            placeholder="Text"
            :disabled="disabled"
            :value="slide.text?.text ?? ''"
            @update:modelValue="(value?: string) => setText(value)"
          />
        </template>
        <template #footer>
          <SuggestButton :disabled="disabled" :loading="isBusy" @suggest="onSuggestText">
            <template #guidance> What do you want to see on this slide? </template>
          </SuggestButton>
        </template>
      </Card>

      <Card>
        <template #title>Image</template>
        <template #subtitle> Set the background image for your slide. </template>
        <template #content>
          <ImageDrop
            :disabled="disabled"
            @uploaded="(image: string) => setImage(image)"
            :preview-image="imagePreview"
          />
        </template>
        <template #footer>
          <SuggestButton
            :disabled="disabled"
            :loading="isBusy"
            :initial-prompt="slide.image?.prompt"
            :initial-negative="slide.image?.negative"
            @automate="onSuggestImage"
            :can-automate="canSuggestImage"
            with-negative
          >
            <template #guidance>
              <p>Use simple keywords that describe your image.</p>
            </template>
          </SuggestButton>
        </template>
      </Card>

      <Card>
        <template #title> Actions </template>
        <template #content>
          <StackedLayout>
            <Button label="Remove" @click="() => $emit('remove')" />
          </StackedLayout>
        </template>
      </Card>
    </StackedLayout>
  </form>
</template>

<style scoped>
textarea {
  resize: vertical;
  width: 100%;
}
</style>
