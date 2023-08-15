<script setup lang="ts">
import { useBusy } from '../../composables/useBusy';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { Slide } from '../../types/slide';
import { computed, ref, shallowRef } from 'vue';
import SlideControls from './SlideControls.vue';
import SlideViewer from '../SlideViewer/SlideViewer.vue';

const { isBusy, op } = useBusy();
const { findTopic } = useSlideBuilder();
const slides = shallowRef<Slide[]>([]);
const topic = ref<string>('');
const activeSlideIndex = ref<number>(-1);
const activeSlide = computed<Slide | undefined>(() =>
  activeSlideIndex.value !== -1 ? slides.value[activeSlideIndex.value] : undefined
);
const canGoNext = computed(() => activeSlideIndex.value < slides.value.length && !!slides.value.length);
const canGoPrev = computed(() => activeSlideIndex.value > 0 && !!slides.value.length);

const goToPrevious = () => {
  if (!canGoPrev.value) return;
  activeSlideIndex.value--;
};

const goToNext = () => {
  if (!canGoNext.value) return;
  activeSlideIndex.value++;
};

const suggestTopic = async () => {
  await op(async () => {
    topic.value = await findTopic();
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

const insertEmptySlide = (at: number = slides.value.length) => {
  const newSlides = [...slides.value];
  newSlides.splice(at, 0, { text: { text: 'New slide, who dis?' } });
  slides.value = newSlides;

  if (activeSlideIndex.value !== -1) return;
  activeSlideIndex.value = at;
};

const updateSlide = (at: number, newSlide: Slide) => {
  const newSlides = [...slides.value];
  newSlides.splice(at, 1, newSlide);
  slides.value = newSlides;
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
          v-model.trim="topic"
          :disabled="isBusy"
        />
        <Button
          :loading="isBusy"
          class="p-inputgroup-addon"
          aria-labelledby="topic"
          data-testid="topic-random-button"
          label="Random"
          @click="suggestTopic"
        >
          <template #icon>
            <span class="pi pi-search" />
          </template>
        </Button>
      </div>
    </div>

    <div class="preview" v-if="activeSlide">
      <SlideViewer :slide="activeSlide" />
    </div>

    <div class="controls" v-if="activeSlide">
      <SlideControls
        :slide="activeSlide"
        :topic="topic"
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
          v-for="(_, index) of slides"
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
