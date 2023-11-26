<script lang="ts" setup>
import Card from 'primevue/card';
import StackedLayout from '../layouts/StackedLayout.vue';
import { TokenName, useVault } from '../composables/useVault';

const { has } = useVault();

const hasOpenAiConfigured = async () => await has(TokenName.OpenAi);
</script>

<template>
  <main class="title">
    <Card>
      <template #title> KaraokAI </template>
      <template #subtitle>
        Welcome to <strong>KaraokAi</strong> &ndash; Your Ultimate PowerPoint Karaoke Companion!
      </template>
      <template #content>
        <h3>
          <i class="pi pi-microphone"></i>
          Why KaraokAi?
        </h3>

        <p>
          Ever found yourself fumbling through a PowerPoint presentation, wishing it was more fun? Say hello to
          KaraokAi, where the art of impromptu speaking meets the hilarity of randomness, powered by the magic of
          ChatGPT and DALL-E!
        </p>

        <h3>
          <i class="pi pi-megaphone"></i>
          Features
        </h3>

        <ol>
          <li>
            <strong>Randomized Slides:</strong>
            Get ready for a wild ride! Our app generates the most unexpected, bizarre, and absolutely hilarious slides,
            ensuring no two presentations are ever the same.
          </li>
          <li>
            <strong>ChatGPT Integration:</strong>
            Need some quick witty text for your slides? ChatGPT is at your service, spinning words faster than a rapper
            on double espresso.
          </li>
          <li>
            <strong>DALL-E's Artistry:</strong>
            Who needs stock photos when you have DALL-E? Get custom images that are as unique as your presentation style
            &ndash; from flying pigs to dancing robots! (Flying dancing pig robots are also possible. Don't ask me how I
            know.)
          </li>
          <li>
            <strong>Plan B:</strong>
            You ran out of your OpenAI budget already? You probably partied to hard and long last night with KaraokAi.
            No worries, you can still create stuff. I am just afraid you might have to use your..
            <span class="muted">[gasp]..</span> imagination!
          </li>
        </ol>
      </template>
    </Card>

    <StackedLayout>
      <Card>
        <template #title> Get started </template>
        <template #subtitle> New here? Here's a few handy hints! </template>
        <template #content>
          <ul>
            <li v-if="!hasOpenAiConfigured">
              <strong>AI assistance:</strong>
              Make sure you have set your OpenAI token in the Settings.
            </li>
            <li>
              <strong>Images:</strong>
              Prepare a folder with random images for when you inevitable run out of budget for your OpenAI account.
            </li>
          </ul>
        </template>
      </Card>

      <Card>
        <template #title> About </template>
        <template #subtitle> Who did this monstrosity?! </template>
        <template #content>
          <p>Developed by MrManny for the Dynatrace community, freely available on GitHub:</p>
          <p>
            <a href="https://github.com/MrManny/karaokai" target="_blank">
              <i class="pi pi-github"></i>
              https://github.com/MrManny/karaokai
            </a>
          </p>
        </template>
      </Card>
    </StackedLayout>
  </main>
</template>

<style scoped>
.title {
  display: grid;
  gap: 8px;
  grid-template-columns: 3fr 1fr;
}

.muted {
  color: var(--text-color-secondary);
}

li {
  padding-top: 8px;
}

li:first-child {
  padding-top: 0;
}

@media (max-width: 800px) {
  .title {
    grid-template-columns: 1fr;
  }
}
</style>
