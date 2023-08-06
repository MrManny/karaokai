<script setup lang="ts">
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import type { PropType } from 'vue';
import { useBusy } from '../../composables/useBusy';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import type { SlideText } from '../../types/slide';
// CAUTION: this only exists to test/demo some GPT-3.5 interactions.
// This will certainly change in a commit or ten.

const { findTopic, generate } = useSlideBuilder();
const { isBusy: isTopicBusy, op: topicOp } = useBusy();
const { isBusy: areCardsBusy, op: cardsOp } = useBusy();

const emit = defineEmits(['update:topic', 'update:slides']);
const props = defineProps({
  topic: {
    type: String,
    default: '',
  },
  slides: {
    type: Array as PropType<SlideText[]>,
    default: () => [],
  },
});

const handleSetTopic = (topic: string) => {
  emit('update:topic', topic.trim());
};

const handleGenerateTopic = async () => {
  await topicOp(async () => {
    const topic = await findTopic();
    handleSetTopic(topic);
  });
};

const handleGenerateText = async () => {
  if (!props.topic) {
    console.error('No topic set.');
    return;
  }

  await cardsOp(async () => {
    const generated = await generate(props.topic);
    emit('update:slides', generated);
  });
};

const handleUpdateText = (index: number, newText: string) => {
  const newOption = [...props.slides];
  newOption[index].text = newText;
  emit('update:slides', newOption);
};
</script>

<template>
  <Card>
    <template #title>
      <span id="topic">Topic</span>
    </template>
    <template #content>
      <div class="p-inputgroup">
        <InputText
          aria-labelledby="topic"
          data-testid="topic-input"
          required
          :value="topic"
          @update:modelValue="(value?: string) => handleSetTopic(value ?? '')"
        />
        <Button
          @click="handleGenerateTopic"
          :loading="isTopicBusy"
          class="p-inputgroup-addon"
          aria-labelledby="topic"
          data-testid="topic-random-button"
          label="Random"
        >
          <template #icon>
            <span class="pi pi-search" />
          </template>
        </Button>
      </div>
    </template>
    <template #footer>
      <Button data-testid="generate-button" :loading="areCardsBusy" @click="handleGenerateText" label="Generate">
        <template #icon>
          <span class="pi pi-search" />
        </template>
      </Button>
    </template>
  </Card>

  <div class="card-deck" v-if="topic">
    <Card v-for="(value, index) of slides" :key="value.text">
      <template #title>
        <span :id="`label_${index}`">
          {{ value.prompt }}
        </span>
      </template>
      <template #content>
        <Textarea
          auto-resize
          required
          :data-testid="`text_${index}`"
          :aria-labelledby="`label_${index}`"
          :value="value.text"
          @update:model-value="(newValue?: string) => handleUpdateText(index, newValue ?? '')"
        />
      </template>
      <template #footer>
        <Button label="Suggest">
          <template #icon>
            <span class="pi pi-search" />
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
