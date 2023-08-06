<script setup lang="ts">
import Button from 'primevue/button';

defineEmits(['openSettings']);
</script>

<template>
  <div class="actions">
    <Button @click="$emit('openSettings')"> Settings </Button>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-items: end;
  align-items: center;
  gap: 8px;
}
</style>
