<script setup lang="ts">
import Button from 'primevue/button';

const emit = defineEmits(['openSettings']);

const onClickSettings = () => {
  emit('openSettings');
};
</script>

<template>
  <div class="actions">
    <Button @click="onClickSettings"> Settings </Button>
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
