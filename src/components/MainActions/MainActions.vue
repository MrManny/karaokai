<script setup lang="ts">
import Button from 'primevue/button';
import type { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
import LoadDialog from '../LoadDialog/LoadDialog.vue';
import SaveDialog from '../SaveDialog/SaveDialog.vue';

const emit = defineEmits(['openEditor', 'openSettings']);
const dialog = useDialog();

const showLoadDialog = () => {
  dialog.open(LoadDialog, {
    props: {
      header: 'Load',
      modal: true,
    },
  });
};

const showSaveDialog = () => {
  dialog.open(SaveDialog, {
    props: {
      header: 'Save',
      modal: true,
    },
  });
};

const menu = ref();
const items: MenuItem[] = [
  { label: 'New', icon: 'pi pi-fw pi-plus', command: () => emit('openEditor') },
  { label: 'Load', icon: 'pi pi-fw pi-download', command: showLoadDialog },
  { label: 'Save', icon: 'pi pi-fw pi-upload', command: showSaveDialog },
  { label: 'Settings', icon: 'pi pi-fw pi-wrench', command: () => emit('openSettings') },
];

const toggle = (ev: Event) => {
  menu.value?.toggle(ev);
};
</script>

<template>
  <Button type="button" label="File" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
  <Menu ref="menu" id="overlay_menu" :model="items" popup />
</template>
