<script setup lang="ts">
import { usePresentation } from '../../stores/presentation';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ProgressBar from 'primevue/progressbar';
import StackedLayout from '../../layouts/StackedLayout.vue';
import Message from 'primevue/message';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import { computed, reactive, ref } from 'vue';
import { useBusy } from '../../composables/useBusy';
import { useRouter } from 'vue-router';
import { useSlideBuilder } from '../../composables/useSlideBuilder';
import { RouteNames } from '../../routes';
import type { Slide } from '../../types/slide-schema';
import FolderPicker from '../FolderPicker/FolderPicker.vue';
import { insertIntroAndOutro, loadBackupImages, pickRandomNumbers } from './Wizard.util';
import AiUseMessage from '../AiUseMessage/AiUseMessage.vue';
import SliderWithLabel from '../SliderWithLabel/SliderWithLabel.vue';
import useVuelidate from '@vuelidate/core';
import { between, required } from '@vuelidate/validators';
import SuggestButton from '../SlideEditor/SuggestButton.vue';

const presentation = usePresentation();
const { push } = useRouter();
const { findTopic, generateImage, generateText, isOpenaiAvailable } = useSlideBuilder();
const { op, isBusy } = useBusy();

const requiresAi = (value: unknown) => isOpenaiAvailable.value || !value;
const state = reactive({
  topic: '',
  length: 15,
  images: 1,
  addText: true,
  addImages: false,
  addIntro: true,
  duration: 15,
  localImagePath: '',
});
const rules = {
  topic: { required },
  length: { between: between(1, 30) },
  images: { between: between(0, state.length) },
  duration: { between: between(0, 60) },
  addText: { requiresAi },
  addImages: { requiresAi },
};
const v$ = useVuelidate(rules, state);

const tasksDone = ref<number>(0);
const tasksTotal = ref<number>(0);

const progress = computed<number>(() => {
  if (tasksTotal.value <= 0) return 0;
  const percentage = tasksDone.value / tasksTotal.value;
  return Math.round(percentage * 100);
});

interface GenerationOptions {
  topic: string;
  slideNo: number;
  withImage: boolean;
  withText: boolean;
}

async function suggestTopic() {
  await op(async () => {
    state.topic = await findTopic();
    v$.value.topic.$touch();
  });
}

function promoteSlides(settings: typeof state, slides: Slide[]) {
  presentation.topic = settings.topic;
  presentation.slides = slides;
  if (!settings.duration) return;
  presentation.timer = {
    timePerTick: settings.duration * 1000,
  };
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

  op(async () => {
    if (!(await v$.value.$validate())) return;

    const slidesWithAiImage = new Set<number>(Array.from(pickRandomNumbers(state.images, state.length)));
    const backupImages = await loadBackupImages(state.localImagePath, state.length - state.images);
    console.debug('Generating slides');

    const promises: Promise<Slide>[] = [];
    for (let i = 0; i < state.length; i++) {
      const withAiImage = slidesWithAiImage.has(i);
      const slideGeneration = generateSlide({
        topic: state.topic,
        slideNo: i + 1,
        withText: state.addText,
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
    let slides = await Promise.all(promises);
    if (state.addIntro) {
      slides = insertIntroAndOutro(presentation.topic, presentation.slides);
    }
    promoteSlides(state, slides);

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
          <template #title>
            <span class="pi pi-file-edit" />
            Topic
          </template>
          <template #subtitle> What is the topic of your presentation? </template>
          <template #content>
            <div class="topic-picker">
              <InputText
                data-testid="topic-input"
                v-model.trim="state.topic"
                placeholder="Topic"
                required
                @blur="v$.topic.$touch"
              />

              <SuggestButton :disabled="isBusy" :loading="isBusy" @suggest="suggestTopic" />
            </div>
          </template>
          <template #footer>
            <Message v-if="v$.topic.$error" severity="error" :closable="false">
              Please don't forget to set a topic
            </Message>
          </template>
        </Card>

        <Card>
          <template #title>
            <span class="pi pi-list" />
            Length
          </template>
          <template #subtitle> How many slides should this presentation contain? </template>
          <template #content>
            <SliderWithLabel
              data-testid="slides-length-input"
              v-model.number="state.length"
              :min="1"
              :max="30"
              @blur="v$.length.$touch"
            />

            <p>Do you also want an intro and outro slide on top of that?</p>

            <div class="radio">
              <RadioButton v-model="state.addIntro" :value="true" name="add-intro" />
              <label for="add-text">Yes</label>
            </div>
            <div class="radio">
              <RadioButton v-model="state.addIntro" :value="false" name="add-intro" />
              <label for="add-text">No</label>
            </div>
          </template>
          <template #footer>
            <Message v-if="v$.length.$error" severity="error" :closable="false">
              Please double-check the length of your presentation
            </Message>
          </template>
        </Card>

        <Card>
          <template #title>
            <span class="pi pi-file-word" />
            Text
          </template>
          <template #subtitle> Do you want me to create texts? </template>
          <template #content>
            <div class="radio">
              <RadioButton v-model="state.addText" :value="true" name="add-text" @blur="v$.addText.$touch" />
              <label for="add-text">Yes</label>
            </div>
            <div class="radio">
              <RadioButton v-model="state.addText" :value="false" name="add-text" @blur="v$.addText.$touch" />
              <label for="add-text">No</label>
            </div>
          </template>
          <template #footer>
            <Message v-if="v$.addText.$error" severity="error" :closable="false">
              Use of this function requires a configured OpenAI token
            </Message>

            <AiUseMessage v-else-if="state.addText" :num-ops="state.length" />
          </template>
        </Card>

        <Card>
          <template #title>
            <span class="pi pi-images" />
            Images
          </template>
          <template #subtitle> Do you want me to create background images? </template>
          <template #content>
            <div class="radio">
              <RadioButton v-model="state.addImages" :value="true" name="add-images" @blur="v$.addImages.$touch" />
              <label for="add-text">Yes</label>

              <SliderWithLabel
                data-testid="image-number-input"
                :min="1"
                :max="state.length"
                v-model="state.images"
                :disabled="!state.addImages"
                @blur="v$.images.$touch"
              />
            </div>
            <div class="radio">
              <RadioButton v-model="state.addImages" :value="false" name="add-images" @blur="v$.addImages.$touch" />
              <label for="add-text">No</label>
            </div>

            <p>If you want to provide your own images, pick a folder below. They will be randomly selected.</p>

            <div>
              <FolderPicker @update:folder="(folder: string) => (state.localImagePath = folder)" />
            </div>
          </template>
          <template #footer>
            <Message v-if="v$.addImages.$error" severity="error" :closable="false">
              Use of this function requires a configured OpenAI token
            </Message>

            <AiUseMessage v-else-if="state.addImages" :num-ops="state.images" />
          </template>
        </Card>

        <Card>
          <template #title>
            <span class="pi pi-stopwatch" />
            Autoplay
          </template>
          <template #subtitle> How much time (in seconds) do you want to for each slide? </template>
          <template #content>
            <SliderWithLabel
              data-testid="duration-input"
              :min="0"
              :max="60"
              v-model.number="state.duration"
              @blur="v$.duration.$touch"
            />
          </template>
          <template #footer>
            <Message v-if="v$.duration.$error" severity="error" :closable="false">
              The duration seems off. Can you double-check please?
            </Message>
          </template>
        </Card>

        <Button
          data-testid="generate-button"
          :disabled="isBusy || v$.$error"
          :loading="isBusy"
          label="Generate"
          @click="generate"
        />
      </div>

      <ProgressBar
        data-testid="generate-progress-bar"
        v-if="isBusy"
        :mode="progress ? 'determinate' : 'indeterminate'"
        :value="progress"
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

.p-card-title .pi {
  color: var(--primary-color);
  margin-right: 8px;
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

  .p-card-title .pi {
    margin-right: 4px;
  }
}

.topic-picker {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr auto;
}

.radio {
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding-bottom: 4px;
}

.radio *:last-child {
  flex-grow: 1;
}

.p-card:focus-within {
  background-color: var(--surface-50);
}
</style>
