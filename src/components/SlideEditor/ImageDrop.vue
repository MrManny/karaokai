<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';

const isHot = ref<boolean>(false);
const isRejecting = ref<boolean>(false);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  allowTypes: {
    type: Array as PropType<string[]>,
    default: () => ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  },
});

const emit = defineEmits(['uploaded']);

const readAsData = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject();
    reader.readAsDataURL(file);
  });
};

const dragover = (ev: DragEvent) => {
  ev.preventDefault();
  isHot.value = true;
  if (!ev.dataTransfer) return;

  const item = ev.dataTransfer.items[0];
  isRejecting.value = !!props.allowTypes?.length && !props.allowTypes.includes(item.type);
};

const dragleave = (ev: DragEvent) => {
  ev.preventDefault();
  isHot.value = false;
};

const drop = async (ev: DragEvent) => {
  ev.preventDefault();
  isHot.value = false;
  isRejecting.value = false;
  if (props.disabled) return;

  if (!ev.dataTransfer?.items.length) return;
  const item = ev.dataTransfer.items[0];
  if (!!props.allowTypes?.length && !props.allowTypes.includes(item.type)) {
    isRejecting.value = true;
    return;
  }
  const file = item.getAsFile();
  if (!file) return;
  const contents = await readAsData(file);

  emit('uploaded', contents);
};
</script>

<template>
  <div
    class="drop-zone"
    :class="{ disabled: disabled, hot: isHot, reject: isRejecting }"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div v-if="!isHot">Drop an image here</div>
    <div v-else-if="!isRejecting">Okay, now let go!</div>
    <div v-else>Well, fuck.</div>
  </div>
</template>

<style scoped>
.drop-zone {
  border: 2px solid var(--gray-300);
  color: var(--gray-300);
  border-radius: 5px;
  aspect-ratio: 16/9;
  min-width: 96px;
  min-height: 54px;
}

.drop-zone.hot {
  border-color: var(--primary-300);
  color: var(--primary-300);
}

.drop-zone.reject {
  border-color: var(--red-700);
  color: var(--red-700);
  cursor: no-drop;
}

.drop-zone.disabled {
  border-color: var(--gray-600);
  color: var(--gray-600);
  cursor: no-drop;
}
</style>
