<script setup lang="ts">
import { usePresentation } from '../../stores/presentation';
import Button from 'primevue/button';
import type { Slide } from '../../types/slide-schema';
import SlideControls from './SlideControls.vue';
import SlideViewer from '../SlideViewer/SlideViewer.vue';
import { topic } from '../../composables/useSlideBuilder/prompts';
import { WellKnownKeys } from '../../composables/useKeyDown';
import { usePresenter } from '../../composables/usePresenter';
import TopicInput from './TopicInput.vue';

const emit = defineEmits(['play']);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: () => false,
  },
});

const presentation = usePresentation();
const { activeSlideIndex, activeSlide, canGoBack, canGoForward, goBack, goForward } = usePresenter();

const moveThroughSlides = (ev: KeyboardEvent) => {
  switch (ev.key) {
    case WellKnownKeys.ArrowLeft:
      ev.preventDefault();
      goBack();
      break;
    case WellKnownKeys.ArrowRight:
      ev.preventDefault();
      goForward();
      break;
  }
};

const insertEmptySlide = () => {
  const at = presentation.slideCount;
  presentation.insertEmpty(at);

  if (activeSlideIndex.value !== -1) return;
  activeSlideIndex.value = at;
};

const updateSlide = (at: number, newSlide: Slide) => {
  presentation.replace(at, newSlide);
};

const playPresentation = () => {
  if (props.disabled) return;
  emit('play');
};
</script>

<template>
  <div class="editor" data-testid="editor">
    <div class="topic">
      <TopicInput
        :topic="presentation.topic"
        :disabled="disabled"
        :topic-prompt="topic.prompt"
        @update:topic="(newTopic: string) => (presentation.topic = newTopic)"
      />
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
        :disabled="!canGoBack"
        label="Previous"
        @click="goBack"
        class="nav"
        icon="pi pi-arrow-left"
        icon-pos="left"
      />

      <div class="paginator">
        <Button
          v-for="(_, index) of presentation.slides"
          :data-testid="`slide-${index}-button`"
          :key="index"
          :label="`#${index + 1}`"
          :outlined="activeSlideIndex === index"
          @click="() => (activeSlideIndex = index)"
        />
      </div>

      <Button label="New" @click="() => insertEmptySlide()" class="nav" icon="pi pi-plus" />

      <Button
        :disabled="!canGoForward"
        label="Next"
        @click="goForward"
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
  grid-template-columns: 80px 1fr repeat(3, 80px);
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
