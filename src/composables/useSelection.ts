import { computed, ref, shallowRef } from 'vue';

export function useSelection<T>() {
  const options = shallowRef<T[]>([]);
  const selectedIndex = ref<number>(-1);
  const selected = computed<T | undefined>(() => (selectedIndex.value !== -1 ? options.value[selectedIndex.value] : undefined));

  function select(index: number): void {
    selectedIndex.value = index;
  }

  function push(option: T): void {
    options.value.push(option);
    select(options.value.length - 1);
  }

  function reset(): void {
    select(-1);
    options.value = [];
  }

  return {
    options,
    push,
    reset,
    selected,
  };
}
