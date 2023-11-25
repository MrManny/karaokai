<script setup lang="ts">
import { usePresentation } from '../../stores/presentation';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ProgressBar from 'primevue/progressbar';
import Slider from 'primevue/slider';
import StackedLayout from '../../layouts/StackedLayout.vue';
import Message from 'primevue/message';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import { computed, ref, watch } from 'vue';
import { useBusy } from '../../composables/useBusy';
import { useRouter } from 'vue-router';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { RouteNames } from '../../routes';
import type { Slide } from '../../types/slide-schema';
import FolderPicker from '../FolderPicker/FolderPicker.vue';
import { insertIntroAndOutro, loadBackupImages, pickRandomNumbers } from './Wizard.util';
import AiUsedMessage from './AiUsedMessage.vue';

const presentation = usePresentation();
const { push } = useRouter();
const { findTopic, generateImage, generateText, isOpenaiAvailable } = useSlideBuilder();
const { op, isBusy } = useBusy();
const length = ref<number>(15);
const images = ref<number>(1);
const duration = ref<number>(15);
const addText = ref<boolean>(true);
const addImages = ref<boolean>(false);
const localImagePath = ref<string>('');
const tasksDone = ref<number>(0);
const tasksTotal = ref<number>(0);
const withIntroAndOutro = ref<boolean>(true);

const progress = computed<number>(() => {
  if (tasksTotal.value <= 0) return 0;
  const percentage = tasksDone.value / tasksTotal.value;
  return Math.round(percentage * 100);
});

watch(duration, (value: number) => {
  presentation.timer = {
    timePerTick: value * 1000,
  };
});

interface GenerationOptions {
  topic: string;
  slideNo: number;
  withImage: boolean;
  withText: boolean;
}

async function generateSlide({ topic, slideNo, withImage, withText }: GenerationOptions): Promise<Slide> {
  const slide: Slide = {};
  if (withText) {
    const text = await generateText(topic, slideNo);
    slide.text = { text };
    console.debug(`Generated slide's ${slideNo} text: "${text}"`);
  }
  if (!withImage) return slide;

  try {
    const image = await generateImage(slide.text?.text);
    slide.image = { base64: image };
    console.debug(`Generated slide's ${slideNo} image`);
  } catch (e) {
    console.error(e);
  }

  return slide;
}

const generate = () => {
  tasksDone.value = 0;
  tasksTotal.value = 0;

  const slidesWithAiImage = new Set<number>(Array.from(pickRandomNumbers(images.value, length.value)));

  op(async () => {
    const backupImages = await loadBackupImages(localImagePath.value, length.value - images.value);

    if (!presentation.topic) {
      presentation.topic = await findTopic();
    }
    console.debug('Generating slides');

    const promises: Promise<Slide>[] = [];
    for (let i = 0; i < length.value; i++) {
      const withAiImage = slidesWithAiImage.has(i);
      const slideGeneration = generateSlide({
        topic: presentation.topic,
        slideNo: i + 1,
        withText: addText.value,
        withImage: withAiImage,
      }).then((slide) => {
        tasksDone.value++;

        if (!withAiImage && backupImages.length) {
          const [localImage] = backupImages.splice(0, 1);
          slide.image = { base64: localImage };
        }

        return slide;
      });
      promises.push(slideGeneration);
    }
    tasksTotal.value = promises.length;
    presentation.slides = await Promise.all(promises);
    if (withIntroAndOutro.value) {
      presentation.slides = insertIntroAndOutro(presentation.topic, presentation.slides);
    }

    console.debug('Done generating', { slides: presentation.slides });
    void push({ name: RouteNames.Editor });
  });
};
</script>

<template>
  <main>
    <StackedLayout>
      <Message v-if="!isOpenaiAvailable" severity="warn" :closable="false">
        <div>OpenAI credentials have not been configured. AI operations are unavailable.</div>
        <div>Configure your OpenAI credentials in the settings here:</div>
        <Button label="Configure OpenAI" severity="warning" @click="$router.push({ name: RouteNames.Vault })" />
      </Message>

      <div class="card-deck">
        <Card>
          <template #title>Topic</template>
          <template #content>
            <p>
              Hi! I'm a wizard. I do presentations and stuff. What is the <strong>topic</strong> of your presentation?
              Feel free to leave it blank, then I'll just come up with something for you.
            </p>

            <div>
              <InputText data-testid="topic-input" v-model.trim="presentation.topic" placeholder="Topic" />
            </div>
          </template>
          <template #footer>
            <AiUsedMessage v-if="!presentation.topic" />
          </template>
        </Card>

        <Card>
          <template #title>Length</template>
          <template #content>
            <p>How many slides should this presentation contain?</p>

            <div class="slider">
              <Slider data-testid="slides-length-input" v-model.number="length" :min="1" :max="30" :step="1" />
              <span class="number">{{ length }}</span>
            </div>

            <p>Do you also want an intro and outro slide on top of that?</p>

            <div class="radio">
              <RadioButton v-model="withIntroAndOutro" :value="true" name="add-intro" />
              <label for="add-text">Yes</label>
            </div>
            <div class="radio">
              <RadioButton v-model="withIntroAndOutro" :value="false" name="add-intro" />
              <label for="add-text">No</label>
            </div>
          </template>
        </Card>

        <Card>
          <template #title>Text</template>
          <template #content>
            <p>Do you want me to create texts?</p>
            <div class="radio">
              <RadioButton v-model="addText" :value="true" name="add-text" />
              <label for="add-text">Yes</label>
            </div>
            <div class="radio">
              <RadioButton v-model="addText" :value="false" name="add-text" />
              <label for="add-text">No</label>
            </div>
          </template>
          <template #footer>
            <AiUsedMessage v-if="addText" :num-ops="length" />
          </template>
        </Card>

        <Card>
          <template #title>Images</template>
          <template #content>
            <p>Do you want me to create background images?</p>
            <div class="radio">
              <RadioButton v-model="addImages" :value="true" name="add-images" />
              <label for="add-text">Yes</label>

              <div class="slider">
                <Slider
                  :disabled="!addImages"
                  data-testid="image-number-input"
                  v-model.number="images"
                  :min="1"
                  :max="length"
                  :step="1"
                />
                <span class="number">{{ images }}</span>
              </div>
            </div>
            <div class="radio">
              <RadioButton v-model="addImages" :value="false" name="add-images" />
              <label for="add-text">No</label>
            </div>

            <p>If you want to provide your own images, pick a folder below. They will be randomly selected.</p>

            <div>
              <FolderPicker @update:folder="(folder: string) => (localImagePath = folder)" />
            </div>
          </template>
          <template #footer>
            <AiUsedMessage v-if="addImages" :num-ops="images" />
          </template>
        </Card>

        <Card>
          <template #title>Autoplay</template>
          <template #content>
            <p>How much time (in seconds) do you want to for each slide?</p>
            <div class="slider">
              <Slider data-testid="duration-input" v-model.number="duration" :min="5" :max="60" :step="1" />
              <span class="number">{{ length }}</span>
            </div>
          </template>
        </Card>
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
</template>

<style scoped>
.card-deck {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 800px) {
  .card-deck {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 400px) {
  .card-deck {
    grid-template-columns: 1fr;
  }
}

.radio {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.radio *:last-child {
  flex-grow: 1;
}

.slider {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr minmax(32px, 10%);
  gap: 8px;
}

.number {
  text-align: right;
}
</style>
