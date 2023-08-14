<script setup lang="ts">
import { useBusy } from '../../composables/useBusy';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { Slide } from '../../types/slide';
import { computed, ref, shallowRef } from 'vue';
import SlidePreview from '../SlidePreview/SlidePreview.vue';
import SlideControls from './SlideControls.vue';

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
      <img
        v-if="activeSlide.image?.base64"
        :src="`data:image/png;base64,${activeSlide.image.base64}`"
        :alt="activeSlide.image?.prompt ?? ''"
      />
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

      <SlidePreview
        v-for="(slide, index) of slides"
        :key="index"
        :number="index + 1"
        :slide="slide"
        :class="{ active: activeSlideIndex === index }"
        @click="() => (activeSlideIndex = index)"
      />

      <Button label="New" @click="() => insertEmptySlide()" icon="pi pi-plus" />

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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: stretch;
}

.slide-deck .nav {
  align-self: center;
}

.preview {
  grid-area: Preview;
}

.controls {
  grid-area: EditorControls;
}

.active {
  border: 2px solid var(--primary-50);
}
</style>
