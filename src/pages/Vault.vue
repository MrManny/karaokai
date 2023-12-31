<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import SettingsForm from '../components/SettingsForm/SettingsForm.vue';
import { TokenName, useVault } from '../composables/useVault';
import { useBusy } from '../composables/useBusy';

const { keys, set } = useVault();

const { isBusy, op } = useBusy();
const openAiKey = ref<string>('');
const openAiKeyChanged = ref<boolean>(false);
const openAiKeyExists = ref<boolean>(false);

const canSave = computed(() => {
  const isDirty = openAiKeyChanged.value;
  return !isBusy.value && isDirty;
});

function reload(): Promise<void> {
  return op(async () => {
    const savedKeys = await keys();
    openAiKeyExists.value = savedKeys.includes(TokenName.OpenAi);
  });
}

onMounted(async () => {
  await reload();
});

async function onSave(): Promise<void> {
  if (!canSave.value) return;
  await op(async () => {
    if (openAiKeyChanged.value) await set(TokenName.OpenAi, openAiKey.value);
    await reload();
  });
}
</script>

<template>
  <SettingsForm
    :disabled="canSave"
    @save="onSave"
    :open-ai-key="openAiKey"
    :has-open-ai-key="openAiKeyExists"
    @update:openAiKey="(key) => (openAiKey = key)"
  />
</template>

<style scoped></style>
