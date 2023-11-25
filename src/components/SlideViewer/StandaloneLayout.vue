<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  isHeading: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="standalone">
    <div :class="{ heading: isHeading }">{{ text }}</div>
  </div>
</template>

<style scoped>
.standalone {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.heading {
  font-size: 150%;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom: 2pt solid var(--gray-600);
}
</style>
