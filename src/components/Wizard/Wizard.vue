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
import FolderPicker from '../FolderPicker/FolderPicker.vue';
import { ipcRenderer } from 'electron';

const presentation = usePresentation();
const { push } = useRouter();
const { findTopic, generateImage, generateText } = useSlideBuilder();
const { op, isBusy } = useBusy();
const length = ref<number>(5);
const images = ref<number>(3);
const localImagePath = ref<string>('');
const tasksDone = ref<number>(0);
const tasksTotal = ref<number>(0);
const progress = computed<number>(() => {
  if (tasksTotal.value <= 0) return 0;
  const percentage = tasksDone.value / tasksTotal.value;
  return Math.round(percentage * 100);
});

function* range(toExcl: number): Generator<number> {
  for (let i = 0; i < toExcl; i++) yield i;
}

function pickRandomNumbers(howMany: number, toExcl: number): number[] {
  const available: number[] = Array.from(range(toExcl));
  if (howMany >= toExcl) return available;

  const picked: number[] = [];
  while (picked.length < howMany) {
    const pickedIndex = Math.ceil(Math.random() * available.length);
    const [pickedValue] = available.splice(pickedIndex, 1);
    picked.push(pickedValue);
  }
  return picked;
}

async function generateSlide(topic: string, slideNo: number, withImage: boolean): Promise<Slide> {
  const slide: Slide = {};
  const text = await generateText(topic, slideNo);
  slide.text = { text };
  console.debug(`Generated slide's ${slideNo} text: "${text}"`);
  if (!withImage) return slide;

  try {
    const image = await generateImage(text);
    slide.image = { base64: image };
    console.debug(`Generated slide's ${slideNo} image`);
  } catch (e) {
    console.error(e);
  }

  return slide;
}

async function loadBackupImages(): Promise<string[]> {
  const howMany = length.value - images.value;
  if (!howMany) return [];

  return await ipcRenderer.invoke('pick-random-images', localImagePath.value, howMany);
}

const generate = () => {
  tasksDone.value = 0;
  tasksTotal.value = 0;

  const slidesWithAiImage = new Set<number>(Array.from(pickRandomNumbers(images.value, length.value)));

  op(async () => {
    const backupImages = localImagePath.value ? await loadBackupImages() : [];

    if (!presentation.topic) {
      presentation.topic = await findTopic();
    }
    console.debug('Generating slides');

    const promises: Promise<Slide>[] = [];
    for (let i = 0; i < length.value; i++) {
      const withAiImage = slidesWithAiImage.has(i);
      const slideGeneration = generateSlide(presentation.topic, i + 1, withAiImage).then((slide) => {
        tasksDone.value++;

        if (!withAiImage && backupImages.length) {
          const [localImage] = backupImages.splice(0, 1);
          console.debug('Using local image', { slide: i, localImage });
          slide.image = { base64: localImage };
        }

        return slide;
      });
      promises.push(slideGeneration);
    }
    tasksTotal.value = promises.length;
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

        <h3>Topic</h3>

        <p>
          Hi! I'm a wizard. I do presentations and stuff. What is the <strong>topic</strong> of your presentation? Feel
          free to leave it blank, then I'll just come up with something for you.
        </p>

        <InputText data-testid="topic-input" v-model="presentation.topic" placeholder="Topic" />

        <h3>Length</h3>

        <p>How long you want it to be?</p>

        <div class="slider">
          <span class="number">{{ length }}</span>
          <Slider data-testid="slides-length-input" v-model.number="length" :min="3" :max="10" :step="1" />
        </div>

        <h3>Images</h3>

        <p>How many images should the AI generate?</p>

        <div class="slider">
          <span class="number">{{ images }}</span>
          <Slider data-testid="image-number-input" v-model.number="images" :min="0" :max="5" :step="1" />
        </div>

        <p>Do you want me to use a folder of other images for the rest?</p>

        <div>
          <FolderPicker @update:folder="(folder: string) => (localImagePath = folder)" />
        </div>

        <ProgressBar
          data-testid="generate-progress-bar"
          v-if="isBusy"
          :mode="progress ? 'determinate' : 'indeterminate'"
          :value="progress"
        />

        <Button
          data-testid="generate-button"
          :disabled="isBusy"
          :loading="isBusy"
          label="Generate"
          icon="pi pi-search"
          @click="generate"
        />
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
  background-image: url('/speaking_robot.jpg');
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
