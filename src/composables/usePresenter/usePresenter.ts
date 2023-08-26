import type { Presentation } from '../../types/presentation-schema';
import { useRouter } from 'vue-router';
import { RouteNames } from '../../routes';
import { computed, ref } from 'vue';

export function usePresenter() {
  const { resolve } = useRouter();
  const proxy = ref<Window | null>(null);
  const isRunning = computed<boolean>(() => proxy.value !== null);

  const start = (presentation: Presentation) => {
    const { href } = resolve({ name: RouteNames.Presenter });

    const presenterWindow = window.open(href, '_blank');
    if (presenterWindow === null) return;
    presenterWindow.addEventListener('close', () => (proxy.value = null));
    presenterWindow.addEventListener('error', ({ error }) => console.error(error));
    proxy.value = presenterWindow;
  };

  const end = () => {
    proxy.value?.close();
    proxy.value = null;
  };

  return { start, end, isRunning };
}
