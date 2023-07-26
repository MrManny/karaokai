import { computed, ref } from 'vue';

export function useBusy() {
  const pendingCounter = ref<number>(0);
  const isBusy = computed(() => !!pendingCounter.value);

  async function op<T = void>(fn: () => Promise<T>): Promise<T> {
    pendingCounter.value++;
    try {
      return await fn();
    } finally {
      pendingCounter.value--;
    }
  }

  return {
    isBusy,
    op,
  };
}
