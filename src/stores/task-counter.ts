import { defineStore } from 'pinia';

export const useTaskCounter = defineStore('task-queue', {
  state: () => ({
    pending: 0,
  }),
  getters: {
    isBusy: (state) => state.pending > 0,
  },
});
