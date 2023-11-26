<script setup lang="ts">
import Slider from 'primevue/slider';

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
});

defineEmits(['blur', 'update:modelValue']);
</script>

<template>
  <div class="slider">
    <Slider
      :disabled="disabled"
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="1"
      @update:model-value="(value: number) => $emit('update:modelValue', value)"
      @blur="() => $emit('blur')"
    />
    <span>{{ modelValue }}</span>
  </div>
</template>

<style scoped>
.slider {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  gap: 8px;
}
</style>
