<script setup lang="ts">
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { ref, shallowRef } from 'vue';
import { useBusy } from '../../composables/useBusy';
// CAUTION: this only exists to test/demo some GPT-3.5 interactions.
// This will certainly change in a commit or ten.

const { findTopic, generate } = useSlideBuilder();
const { isBusy, op } = useBusy();
const topic = ref<string>('');
const option = shallowRef<Record<string, string>>({});

const handleGenerateTopic = async () => {
  await op(async () => {
    topic.value = await findTopic();
  });
};

const handleGenerateText = async () => {
  if (!topic.value) {
    console.error('No topic set.');
    return;
  }

  await op(async () => {
    const generated = await generate(topic.value);
    option.value = generated.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue.prompt]: currentValue.text }), {} as Record<string, string>);
  });
};
</script>

<template>
  <div>
    <h2>Text</h2>

    <div>
      <label>
        Topic:
        <input type="text" required v-model.trim="topic" />
        <button @click="handleGenerateTopic" :disabled="isBusy">Random</button>
      </label>
    </div>

    <div class="card-deck">
      <dl v-for="(value, key) in option" :key="key">
        <dt>{{ key }}</dt>
        <dd>{{ value }}</dd>
      </dl>

      <button @click="handleGenerateText" :disabled="isBusy">More</button>
    </div>
  </div>
</template>

<style scoped>
.card-deck {
  @apply flex flex-row gap-2;
}

dt {
  @apply font-semibold;
}
</style>
