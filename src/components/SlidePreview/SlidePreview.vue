<script setup lang="ts">
import Card from 'primevue/card';
import type { PropType } from 'vue';
import type { Slide } from '../../types/slide';

defineProps({
  slide: {
    type: Object as PropType<Slide>,
    required: true,
  },
  number: {
    type: Number,
    default: -1,
  },
});
</script>

<template>
  <Card>
    <template #footer v-if="number >= 0">
      <small>{{ number }}</small>
    </template>
    <template #content>
      <p v-if="slide.text">{{ slide.text.text }}</p>
      <p v-if="slide.image">Image</p>
    </template>
  </Card>
</template>

<style scoped></style>
