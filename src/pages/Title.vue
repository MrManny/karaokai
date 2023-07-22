<script setup lang="ts">
import Button from '../components/Button/Button.vue';
</script>

<template>
  <h2>Typography Test</h2>

  <p>This is a regular paragraph. Much like most paragraphs, this is a string of sentences. Sometimes, they make sense; sometimes, they don't. This one clearly doesn't.</p>

  <p>Look, here's a button to distract you from that:</p>

  <div class="h-group">
    <Button>Default</Button>

    <Button disabled>Disabled</Button>

    <Button variant="primary" disabled>Primary Disabled</Button>

    <Button variant="danger">Danger</Button>

    <Button variant="danger" disabled>Danger Disabled</Button>
  </div>

  <p class="display">Display</p>
</template>
