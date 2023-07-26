<template>
  <component :is="$route.meta.layout ?? 'div'">
    <Suspense>
      <router-view />
    </Suspense>
  </component>
</template>
