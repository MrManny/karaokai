<template>
  <div class="action-bar" data-testid="action-bar">
    <slot />
  </div>
</template>

<style scoped>
.action-bar {
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-items: stretch;
}
</style>
