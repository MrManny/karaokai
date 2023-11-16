<template>
  <component :is="$route.meta.layout ?? 'div'">
    <Suspense>
      <router-view />
    </Suspense>
  </component>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
