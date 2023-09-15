<script lang="ts" setup>
defineProps({
  gap: {
    type: Number,
    default: 8,
    validator: (value) => typeof value === 'number' && value >= 0,
  },
});
</script>

<template>
  <div class="stacked">
    <slot />
  </div>
</template>

<style scoped>
.stacked {
  display: flex;
  flex-direction: column;
  gap: v-bind(gap);
}
</style>
