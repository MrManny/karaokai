<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import SlideEditor from '../components/SlideEditor/SlideEditor.vue';
import type { SlideContent } from '../types/slide';

const topic = ref<string>('');
const slides = shallowRef<SlideContent[]>([]);
</script>

<template>
  <SlideEditor
    :topic="topic"
    :slides="slides"
    @update:topic="(newTopic) => (topic = newTopic)"
    @update:slides="(newSlides) => (slides = newSlides)"
  />
</template>
