<script setup lang="ts">
import { useBusy } from '../../composables/useBusy';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { usePresentation } from '../../stores/presentation';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { Slide } from '../../types/slide-schema';
import { computed, ref, unref } from 'vue';
import SlideControls from './SlideControls.vue';
import SlideViewer from '../SlideViewer/SlideViewer.vue';
import SuggestButton from './SuggestButton.vue';
import { topic } from '../../composables/useSlideBuilder/prompts';

const emit = defineEmits(['play']);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: () => false,
  },
});

const { isBusy, op } = useBusy();
const { findTopic } = useSlideBuilder();
const presentation = usePresentation();
const activeSlideIndex = ref<number>(-1);
const activeSlide = computed<Slide | undefined>(() =>
  activeSlideIndex.value !== -1 ? presentation.slides[activeSlideIndex.value] : undefined
);
const canGoNext = computed(() => activeSlideIndex.value < presentation.slideCount && !!presentation.slideCount);
const canGoPrev = computed(() => activeSlideIndex.value > 0 && presentation.slideCount);

const goToPrevious = () => {
  if (!canGoPrev.value) return;
  activeSlideIndex.value--;
};

const goToNext = () => {
  if (!canGoNext.value) return;
  activeSlideIndex.value++;
};

const suggestTopic = async (prompt: string) => {
  await op(async () => {
    presentation.topic = await findTopic(prompt);
  });
};

const moveThroughSlides = (ev: KeyboardEvent) => {
  switch (ev.key) {
    case 'ArrowLeft':
      ev.preventDefault();
      goToPrevious();
      break;
    case 'ArrowRight':
      ev.preventDefault();
      goToNext();
      break;
  }
};

const insertEmptySlide = (at: number = presentation.slideCount) => {
  presentation.insertEmpty(at);

  if (activeSlideIndex.value !== -1) return;
  activeSlideIndex.value = at;
};

const updateSlide = (at: number, newSlide: Slide) => {
  presentation.replace(at, newSlide);
};

const playPresentation = () => {
  if (props.disabled) return;
  const presentationCopy = { ...unref(presentation) };
  emit('play', presentationCopy);
};
</script>

<template>
  <div class="editor">
    <div class="topic">
      <div class="p-inputgroup">
        <InputText
          aria-labelledby="topic"
          data-testid="topic-input"
          placeholder="Topic"
          required
          v-model.trim="presentation.topic"
          :disabled="isBusy"
        />
        <SuggestButton
          :loading="isBusy"
          :initial-prompt="topic.prompt"
          class="p-inputgroup-addon"
          data-testid="suggest-topic-button"
          @suggest="suggestTopic"
        />
      </div>
    </div>

    <div class="preview" v-if="activeSlide">
      <SlideViewer :slide="activeSlide" />
    </div>

    <div class="controls" v-if="activeSlide">
      <SlideControls
        :slide="activeSlide"
        :topic="presentation.topic"
        @update:slide="(newSlide: Slide) => updateSlide(activeSlideIndex, newSlide)"
      />
    </div>

    <div class="slide-deck" @keydown="(ev) => moveThroughSlides(ev)">
      <Button
        :disabled="!canGoPrev"
        label="Previous"
        @click="goToPrevious"
        class="nav"
        icon="pi pi-arrow-left"
        icon-pos="left"
      />

      <div class="paginator">
        <Button
          v-for="(_, index) of presentation.slides"
          :key="index"
          :label="`#${index + 1}`"
          :outlined="activeSlideIndex === index"
          @click="() => (activeSlideIndex = index)"
        />
      </div>

      <Button label="New" @click="() => insertEmptySlide()" class="nav" icon="pi pi-plus" />

      <Button
        :disabled="!canGoNext"
        label="Next"
        @click="goToNext"
        class="nav"
        icon="pi pi-arrow-right"
        icon-pos="right"
      />

      <Button :disabled="disabled" label="Play" @click="playPresentation" class="nav" />
    </div>
  </div>
</template>

<style scoped>
.editor {
  display: grid;
  gap: 8px;
  grid-template-columns: 3fr minmax(160px, 1fr);
  grid-template-rows: min-content minmax(120px, 1fr) min-content;
  grid-template-areas:
    'Topic Topic'
    'Preview EditorControls'
    'SlideDeck SlideDeck';

  height: 100%;
  width: 100%;
}

.topic {
  grid-area: Topic;
}

.slide-deck {
  grid-area: SlideDeck;
  display: grid;
  gap: 8px;
  grid-template-columns: 80px 1fr 80px 80px;
}

.slide-deck .paginator {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 4px;
  overflow-x: auto;
}

.slide-deck .paginator > * {
  min-width: 64px;
}

.preview {
  grid-area: Preview;
}

.controls {
  grid-area: EditorControls;
}
</style>
