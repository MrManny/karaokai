<script setup lang="ts">
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import type { PropType } from 'vue';
import { useBusy } from '../../composables/useBusy';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import type { Slide } from '../../types/slide';
// CAUTION: this only exists to test/demo some GPT-3.5 interactions.
// This will certainly change in a commit or ten.

const { findImagePrompts, findTopic, generateImage, generateText } = useSlideBuilder();
const { isBusy: isTopicBusy, op: topicOp } = useBusy();
const { isBusy: areCardsBusy, op: cardsOp } = useBusy();

const emit = defineEmits(['update:topic', 'update:slides']);
const props = defineProps({
  topic: {
    type: String,
    default: '',
  },
  slides: {
    type: Array as PropType<Slide[]>,
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
    const generated = await generateText(props.topic);
    emit('update:slides', generated);
  });
};

const handleUpdateText = (index: number, newText: string) => {
  const newSlides: Slide[] = [...props.slides];
  newSlides[index].text = { prompt: newSlides[index].text?.prompt, text: newText };
  emit('update:slides', newSlides);
};

const handleGenerateImage = async (index: number) => {
  const slide = props.slides[index];
  const hasText = !!slide.text?.text;
  if (!hasText) return;

  await cardsOp(async () => {
    const prompt: string = slide.image?.prompt ?? (await findImagePrompts(slide.text?.text ?? ''));
    console.debug({ slide, prompt });
    const image = await generateImage(prompt);
    const newSlides: Slide[] = [...props.slides];
    newSlides[index].image = {
      base64: image,
      prompt,
    };
    emit('update:slides', newSlides);
  });
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
    <Card v-for="(value, index) of slides" :key="index">
      <template #title>
        <span :id="`label_${index}`">
          {{ value.text?.prompt }}
        </span>
      </template>
      <template #content>
        <div>
          <Textarea
            auto-resize
            required
            :data-testid="`text_${index}`"
            :aria-labelledby="`label_${index}`"
            :value="value.text?.text"
            @update:model-value="(newValue?: string) => handleUpdateText(index, newValue ?? '')"
          />
        </div>
        <div v-if="value.image?.base64">
          <img class="responsive" :src="`data:image/png;base64,${value.image?.base64}`" :alt="value.image?.prompt" />
        </div>
      </template>
      <template #footer>
        <Button label="Suggest" :loading="areCardsBusy">
          <template #icon>
            <span class="pi pi-search" />
          </template>
        </Button>
        <Button label="Image" @click="() => handleGenerateImage(index)" :loading="areCardsBusy">
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

.responsive {
  width: 100%;
}
</style>
