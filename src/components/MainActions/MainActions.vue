<script setup lang="ts">
import Button from 'primevue/button';

defineEmits(['openEditor', 'openSettings']);
</script>

<template>
  <div class="actions">
    <Button @click="() => $emit('openEditor')" label="New">
      <template #icon>
        <span class="pi pi-plus" />
      </template>
    </Button>
    <Button @click="() => $emit('openSettings')" label="Settings">
      <template #icon>
        <span class="pi pi-wrench" />
      </template>
    </Button>
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
