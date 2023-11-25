<script setup lang="ts">
import Message from 'primevue/message';

defineProps({
  numOps: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <Message severity="info" :closable="false">
    <div v-if="!numOps">AI will be used for this.</div>
    <div v-else-if="numOps === 1">AI will be used for one operation.</div>
    <div v-else>AI will be used for {{ numOps }} operations.</div>
  </Message>
</template>
