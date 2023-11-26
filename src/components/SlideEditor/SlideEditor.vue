<script setup lang="ts">
import { usePresentation } from '../../stores/presentation';
import type { Slide } from '../../types/slide-schema';
import SlideControls from './SlideControls.vue';
import SlideViewer from '../SlideViewer/SlideViewer.vue';
import { topic } from '../../composables/useSlideBuilder/prompts';
import { usePresenter } from '../../composables/usePresenter';
import TopicInput from './TopicInput.vue';
import SlidePagination from './SlidePagination.vue';

const emit = defineEmits(['play']);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: () => false,
  },
});

const presentation = usePresentation();
const { activeSlideIndex, activeSlide, canGoBack, canGoForward, goBack, goForward, goTo } = usePresenter({});

const insertEmptySlide = () => {
  const at = presentation.slideCount;
  presentation.insertEmpty(at);

  if (activeSlideIndex.value !== -1) return;
  activeSlideIndex.value = at;
};

const removeSlide = () => {
  const at = activeSlideIndex.value;
  presentation.remove(at);
  if (activeSlideIndex.value > 0) {
    goTo(activeSlideIndex.value - 1);
  } else if (presentation.slideCount === 0) {
    goTo(-1);
  }
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
        @remove="() => removeSlide()"
      />
    </div>

    <SlidePagination
      class="slide-deck"
      :disabled="disabled"
      :slides="presentation.slideCount"
      :can-go-back="canGoBack"
      :can-go-forward="canGoForward"
      :active-slide-index="activeSlideIndex"
      @play="playPresentation"
      @new="insertEmptySlide"
      @go-to="(slide: number) => (activeSlideIndex = slide)"
      @go-back="goBack"
      @go-forward="goForward"
    />
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
}

.preview {
  grid-area: Preview;
}

.controls {
  grid-area: EditorControls;
}
</style>
