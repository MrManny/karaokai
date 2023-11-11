<script setup lang="ts">
import { usePresentation } from '../../stores/presentation';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ProgressBar from 'primevue/progressbar';
import Slider from 'primevue/slider';
import StackedLayout from '../../layouts/StackedLayout.vue';
import { computed, ref } from 'vue';
import { useBusy } from '../../composables/useBusy';
import { useRouter } from 'vue-router';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { RouteNames } from '../../routes';
import type { Slide } from '../../types/slide-schema';

const presentation = usePresentation();
const { push } = useRouter();
const { findTopic, generateImage, generateText } = useSlideBuilder();
const { op, isBusy } = useBusy();
const length = ref<number>(5);
const generated = ref<number>(0);
const progress = computed<number>(() => {
  const percentage = generated.value / length.value;
  return Math.round(percentage * 100);
});

const generateSlide = async (topic: string, slideNo: number): Promise<Slide> => {
  let text: string = '',
    image: string = '';
  text = await generateText(topic, slideNo);
  console.debug(`Generated slide's ${slideNo} text: "${text}"`);
  try {
    image = await generateImage(text);
    console.debug(`Generated slide's ${slideNo} image`);
  } catch (e) {
    console.error(e);
  }
  return {
    text: { text },
    image: { base64: image },
  };
};
const generate = () => {
  generated.value = 0;
  op(async () => {
    if (!presentation.topic) {
      presentation.topic = await findTopic();
    }
    console.debug('Generating slides', { desiredLength: length.value, topic: presentation.topic });

    const promises: Promise<Slide>[] = [];
    for (let i = 0; i < length.value; i++) {
      const slideGeneration = generateSlide(presentation.topic, i + 1).then((slide) => {
        generated.value++;
        return slide;
      });
      promises.push(slideGeneration);
    }
    presentation.slides = await Promise.all(promises);
    console.debug('Done generating');
    void push({ name: RouteNames.Editor });
  });
};
</script>

<template>
  <main class="split">
    <div class="robot" />

    <main>
      <StackedLayout>
        <h2>Wizard</h2>

        <p>
          Hi! I'm a wizard. I do presentations and stuff. What is the <strong>topic</strong> of your presentation? Feel
          free to leave it blank, then I'll just come up with something for you.
        </p>

        <InputText v-model="presentation.topic" placeholder="Topic" />

        <p>How long you want it to be?</p>

        <div class="slider">
          <span class="number">{{ length }}</span>
          <Slider v-model.number="length" :min="3" :max="10" :step="1" />
        </div>

        <ProgressBar v-if="isBusy" :mode="progress ? 'determinate' : 'indeterminate'" :value="progress" />

        <Button :disabled="isBusy" :loading="isBusy" label="Generate" icon="pi pi-search" @click="generate" />
      </StackedLayout>
    </main>
  </main>
</template>

<style scoped>
.split {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 8px;
  grid-template-columns: minmax(64px, 25%) 1fr;
  align-items: stretch;
}

div.robot {
  background-image: url('public/speaking_robot.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

div.slider {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(32px, 10%) 1fr;
  gap: 8px;
}

.number {
  text-align: right;
}
</style>
