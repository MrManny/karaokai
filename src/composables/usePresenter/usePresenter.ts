import { usePresentation } from '../../stores/presentation';
import { computed, ref } from 'vue';

export function usePresenter() {
  const presentation = usePresentation();
  const activeSlideIndex = ref<number>(0);
  const activeSlide = computed(() => presentation.slides[activeSlideIndex.value]);
  const totalSlides = computed(() => presentation.slides.length);

  const canGoBack = computed(() => activeSlideIndex.value > 0);
  const canGoForward = computed(() => activeSlideIndex.value < presentation.slideCount);

  const goBack = () => {
    if (!canGoBack.value) return;
    activeSlideIndex.value--;
  };
  const goForward = () => {
    if (!canGoForward.value) return;
    activeSlideIndex.value++;
  };

  return {
    activeSlide,
    activeSlideIndex,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    totalSlides,
  };
}
