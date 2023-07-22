<script setup lang="ts">
import { Cog8ToothIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['onClickSettings']);
</script>

<template>
  <div class="actions">
    <button title="Settings" @click="emit('onClickSettings')">
      <Cog8ToothIcon />
    </button>
  </div>
</template>

<style scoped>
.actions {
  @apply flex gap-2 flex-row flex-nowrap flex-grow justify-end items-center;
}

.actions > button {
  @apply w-8 h-8;
}
</style>
