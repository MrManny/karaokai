<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: () => '',
  },
});
const lines = computed<string[]>(() => props.text?.split('\n'));
</script>

<template>
  <div>
    <p v-for="line in lines" :key="line">
      {{ line }}
    </p>
  </div>
</template>
