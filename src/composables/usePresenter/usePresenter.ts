import { usePresentation } from '../../stores/presentation';
import { computed, ref } from 'vue';
import { useTimer } from '../useTimer/useTimer';
import { ipcRenderer } from 'electron';

interface PresenterOptions {
  onTick?: () => void;
  onTickDue?: () => void;
}

export function usePresenter({ onTick, onTickDue }: PresenterOptions) {
  const presentation = usePresentation();

  const activeSlideIndex = ref<number>(0);
  const activeSlide = computed(() => presentation.slides[activeSlideIndex.value]);
  const totalSlides = computed(() => presentation.slides.length);

  const canGoBack = computed(() => activeSlideIndex.value > 0);
  const canGoForward = computed(() => activeSlideIndex.value < presentation.slideCount - 1);

  const goBack = () => {
    if (!canGoBack.value) return;
    activeSlideIndex.value--;
  };
  const goForward = () => {
    if (!canGoForward.value) return;
    activeSlideIndex.value++;
  };

  const { start, stop } = useTimer({
    timePerTick: presentation.timer?.timePerTick ?? 10_000,
    onTick: () => {
      if (!canGoForward.value) {
        console.debug('Stopping ticks');
        stop();
      } else {
        console.debug('Going forward');
        goForward();
      }
      onTick?.();
    },
    onTickDue: () => {
      onTickDue?.();
    },
  });

  const setFullscreen = (fullScreen = true) => {
    void ipcRenderer.invoke('set-fullscreen', fullScreen);
  };

  return {
    activeSlide,
    activeSlideIndex,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    setFullscreen,
    start,
    stop,
    totalSlides,
  };
}
