<script setup lang="ts">
import Button from 'primevue/button';
import { computed } from 'vue';

const props = defineProps({
  activeSlideIndex: {
    type: Number,
    required: true,
  },
  canGoForward: {
    type: Boolean,
    required: true,
  },
  canGoBack: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  slides: {
    type: Number,
    required: true,
  },
});

defineEmits(['new', 'goBack', 'goForward', 'goTo', 'play']);

const slidesArray = computed(() => {
  const ary: number[] = [];
  for (let i = 0; i < props.slides; i++) {
    ary.push(i);
  }
  return ary;
});
</script>

<template>
  <div class="slide-pagination">
    <Button
      :disabled="!canGoBack"
      data-testid="slide-go-back"
      label="Previous"
      @click="() => $emit('goBack')"
      class="nav"
      icon="pi pi-arrow-left"
      icon-pos="left"
    />

    <div class="paginator">
      <Button
        v-for="index of slidesArray"
        :data-testid="`slide-go-to-${index}`"
        :key="index"
        :label="`#${index + 1}`"
        :outlined="activeSlideIndex === index"
        @click="() => $emit('goTo', index)"
      />
    </div>

    <Button data-testid="slide-new" label="New" @click="() => $emit('new')" class="nav" icon="pi pi-plus" />

    <Button
      :disabled="!canGoForward"
      data-testid="slide-go-next"
      label="Next"
      @click="() => $emit('goForward')"
      class="nav"
      icon="pi pi-arrow-right"
      icon-pos="right"
    />

    <Button :disabled="disabled" data-testid="slide-play" label="Play" @click="() => $emit('play')" class="nav" />
  </div>
</template>

<style scoped>
.paginator {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 4px;
  overflow-x: auto;
}

.paginator > * {
  min-width: 56px;
}

.slide-pagination {
  display: grid;
  gap: 8px;
  grid-template-columns: 80px 1fr repeat(3, 80px);
}
</style>
