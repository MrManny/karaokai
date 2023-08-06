<script setup lang="ts">
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { ref } from 'vue';
import { useBusy } from '../../composables/useBusy';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
// CAUTION: this only exists to test/demo some GPT-3.5 interactions.
// This will certainly change in a commit or ten.

const { findTopic, generate } = useSlideBuilder();
const { isBusy, op } = useBusy();
const topic = ref<string>('');
const option = ref<Record<string, string>>({});

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
    option.value = generated.reduce(
      (previousValue, currentValue) => ({ ...previousValue, [currentValue.prompt]: currentValue.text }),
      {} as Record<string, string>
    );
  });
};

const update = (key: string, value: string) => {
  option.value[key] = value.trim();
};
</script>

<template>
  <h2>Text</h2>

  <Card>
    <template #title>
      <span id="topic">Topic</span>
    </template>
    <template #content>
      <div class="p-inputgroup">
        <InputText aria-labelledby="topic" data-testid="topic-input" required v-model.trim="topic" />
        <Button
          @click="handleGenerateTopic"
          :disabled="isBusy"
          class="p-inputgroup-addon"
          aria-labelledby="topic"
          data-testid="topic-random-button"
          label="Random"
        />
      </div>
    </template>
  </Card>

  <Button :disabled="!option" @click="handleGenerateText" label="Generate" />

  <div class="card-deck" v-if="topic">
    <Card v-for="(value, key) in option" :key="key">
      <template #title>
        <span :id="`label_${key}`">
          {{ key }}
        </span>
      </template>
      <template #content>
        <Textarea
          auto-resize
          required
          :aria-labelledby="`label_${key}`"
          :value="value"
          @update:model-value="(newValue: string) => update(key, newValue)"
        />
      </template>
      <template #footer>
        <Button label="Suggest">
          <template #icon>
            <span class="pi pi-replay" />
          </template>
        </Button>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.card-deck {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(128px, 256px));
  gap: 8px;
}
</style>
