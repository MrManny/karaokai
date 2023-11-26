<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';
import LoadDialog from '../LoadDialog/LoadDialog.vue';
import SaveDialog from '../SaveDialog/SaveDialog.vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '../../routes';

const emit = defineEmits(['exit', 'openEditor', 'openSettings', 'openWizard']);
const router = useRouter();
const isLoadVisible = ref<boolean>(false);
const isSaveVisible = ref<boolean>(false);

const showLoadDialog = (show = true) => {
  isLoadVisible.value = show;
};

const showSaveDialog = (show = true) => {
  isSaveVisible.value = show;
};

const onLoaded = () => {
  showLoadDialog(false);
  void router.push({
    name: RouteNames.Editor,
  });
};

const menu = ref();
const items: MenuItem[] = [
  {
    label: 'New',
    items: [
      { label: 'New (Wizard)', icon: 'pi pi-fw pi-plus', command: () => emit('openWizard') },
      { label: 'Editor', icon: 'pi pi-fw pi-plus', command: () => emit('openEditor') },
    ],
  },
  {
    label: 'File',
    items: [
      { label: 'Load', icon: 'pi pi-fw pi-download', command: () => showLoadDialog() },
      { label: 'Save', icon: 'pi pi-fw pi-upload', command: () => showSaveDialog() },
    ],
  },
  {
    label: 'Settings',
    items: [{ label: 'API keys', icon: 'pi pi-fw pi-wrench', command: () => emit('openSettings') }],
  },
  {
    label: 'Stuff',
    items: [{ label: 'Quit', icon: 'pi pi-fw pi-times', command: () => emit('exit') }],
  },
];

const toggle = (ev: Event) => {
  menu.value?.toggle(ev);
};
</script>

<template>
  <Button type="button" label="File" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
  <Menu ref="menu" id="overlay_menu" :model="items" popup />

  <Dialog v-model:visible="isLoadVisible" header="Load" modal data-testid="load-dialog">
    <LoadDialog @loaded="() => onLoaded()" />
  </Dialog>

  <Dialog v-model:visible="isSaveVisible" header="Save" modal data-testid="save-dialog">
    <SaveDialog @saved="() => showSaveDialog(false)" />
  </Dialog>
</template>
