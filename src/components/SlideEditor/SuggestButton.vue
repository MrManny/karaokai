<script setup lang="ts">
import Button from 'primevue/button';

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: () => 'Suggest',
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['click']);
</script>

<template>
  <Button :disabled="disabled" :loading="loading" :label="label" @click="() => $emit('click')" icon="pi pi-search" />
</template>
