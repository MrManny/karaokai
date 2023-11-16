import { computed } from 'vue';
import { useTaskCounter } from '../../stores/task-counter';

export function useBusy() {
  const taskCounter = useTaskCounter();
  const isBusy = computed(() => taskCounter.isBusy);

  async function op<T = void>(fn: () => Promise<T>): Promise<T> {
    taskCounter.pending++;
    try {
      return await fn();
    } finally {
      taskCounter.pending--;
    }
  }

  return {
    isBusy,
    op,
  };
}
