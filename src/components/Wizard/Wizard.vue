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

async function suggestTopic() {
  await op(async () => {
    state.topic = await findTopic();
    v$.value.topic.$touch();
  });
}

function promoteSlides(slides: Slide[]) {
  presentation.load({
    topic: state.topic,
    timer: state.duration ? { timePerTick: state.duration * 1000 } : undefined,
    slides,
  });
}

function buildEmptySlides(howMany: number): Slide[] {
  if (howMany <= 0) return [];
  const slides: Slide[] = new Array<Slide>(howMany);
  for (let i = 0; i < slides.length; i++) {
    slides[i] = {};
  }
  return slides;
}

const generate = () => {
  tasksDone.value = 0;
  tasksTotal.value = 0;

  op(async () => {
    if (!(await v$.value.$validate())) return;

    const slidesWithAiImage = state.addImages
      ? new Set<number>(Array.from(pickRandomNumbers(state.images, state.length)))
      : new Set<number>();
    const backupImages = await loadBackupImages(state.localImagePath, state.length - state.images);
    const slidePrototypes = state.addText
      ? await generateText(state.topic, state.length)
      : buildEmptySlides(state.length);
    console.debug({ slidePrototypes });
    const promises: Promise<Slide>[] = slidePrototypes.map(async (prototype: Slide, index: number): Promise<Slide> => {
      const slide = { ...prototype };
      const hasAiImage = slidesWithAiImage.has(index);
      if (hasAiImage && prototype.image?.prompt) {
        slide.image = {
          base64: await generateImage(prototype.image?.prompt ?? ''),
          prompt: prototype.image?.prompt,
        };
      } else if (backupImages.length) {
        const [localImage] = backupImages.splice(0, 1);
        slide.image = { base64: localImage };
      }
      return slide;
    });

    tasksTotal.value = promises.length;
    let slides = await Promise.all(promises);
    console.debug({ slides });
    if (state.addIntro) {
      slides = insertIntroAndOutro(state.topic, slides);
    }
    console.debug({ slides });
    promoteSlides(slides);

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
        <Button
          label="Configure OpenAI"
          severity="warning"
          @click="$router.push({ name: RouteNames.Vault })"
          :disabled="isBusy"
        />
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
                :disabled="isBusy"
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
              :disabled="isBusy"
              @blur="v$.length.$touch"
            />

            <p>Do you also want an intro and outro slide on top of that?</p>

            <div class="radio">
              <RadioButton v-model="state.addIntro" :value="true" name="add-intro" :disabled="isBusy" />
              <label for="add-text">Yes</label>
            </div>
            <div class="radio">
              <RadioButton v-model="state.addIntro" :value="false" name="add-intro" :disabled="isBusy" />
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
              <RadioButton
                v-model="state.addText"
                :value="true"
                name="add-text"
                @blur="v$.addText.$touch"
                :disabled="isBusy"
              />
              <label for="add-text">Yes</label>
            </div>
            <div class="radio">
              <RadioButton
                v-model="state.addText"
                :value="false"
                name="add-text"
                @blur="v$.addText.$touch"
                :disabled="isBusy"
              />
              <label for="add-text">No</label>
            </div>
          </template>
          <template #footer>
            <Message v-if="v$.addText.$error" severity="error" :closable="false">
              Use of this function requires a configured OpenAI token
            </Message>

            <AiUseMessage v-else-if="state.addText" />
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
              <RadioButton
                v-model="state.addImages"
                :value="true"
                name="add-images"
                @blur="v$.addImages.$touch"
                :disabled="isBusy"
              />
              <label for="add-text">Yes</label>

              <SliderWithLabel
                data-testid="image-number-input"
                :min="1"
                :max="state.length"
                v-model="state.images"
                :disabled="!state.addImages || isBusy"
                @blur="v$.images.$touch"
              />
            </div>
            <div class="radio">
              <RadioButton
                v-model="state.addImages"
                :value="false"
                name="add-images"
                @blur="v$.addImages.$touch"
                :disabled="isBusy"
              />
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
              :disabled="isBusy"
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
