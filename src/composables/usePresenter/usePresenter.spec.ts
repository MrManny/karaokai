import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePresenter } from './usePresenter';
import { usePresentation } from '../../stores/presentation';
import { useTimer } from '../useTimer/useTimer';
import { nextTick, reactive } from 'vue';
import type { Slide } from '../../types/slide-schema';

vi.mock('../../stores/presentation', () => ({
  usePresentation: vi.fn(),
}));

vi.mock('../useTimer/useTimer', () => ({
  useTimer: vi.fn(),
}));

describe('usePresenter', () => {
  vi.useFakeTimers();
  const mockSlides: Slide[] = [
    {
      text: { text: 'Hello world!' },
    },
    {
      image: { base64: '01234' },
    },
    {
      text: { text: 'Lorem ipsum' },
      image: { base64: 'dolorsit' },
    },
  ];
  const mockPresentation = reactive({
    slides: mockSlides,
    slideCount: mockSlides.length,
    timer: { timePerTick: 1000 },
  });

  const mockTimerStart = vi.fn();
  const mockTimerStop = vi.fn();
  const mockTimer = {
    start: mockTimerStart,
    stop: mockTimerStop,
  };

  beforeEach(() => {
    usePresentation.mockReturnValue(mockPresentation);
    useTimer.mockReturnValue(mockTimer);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('initializes with default values', () => {
    const presenter = usePresenter({});
    expect(presenter.activeSlideIndex.value).toBe(0);
    expect(presenter.totalSlides.value).toBe(mockSlides.length);
  });

  it('computes canGoBack and canGoForward correctly', async () => {
    const presenter = usePresenter({});
    expect(presenter.canGoBack.value).toBeFalsy();
    expect(presenter.canGoForward.value).toBeTruthy();

    presenter.goForward();
    await nextTick();

    expect(presenter.activeSlideIndex.value).toEqual(1);
    expect(presenter.canGoBack.value).toBeTruthy();
    expect(presenter.canGoForward.value).toBeTruthy();

    presenter.goForward();
    await nextTick();

    expect(presenter.activeSlideIndex.value).toEqual(2);
    expect(presenter.canGoBack.value).toBeTruthy();
    expect(presenter.canGoForward.value).toBeFalsy();
  });

  it('will not go back if it cannot go back', async () => {
    const presenter = usePresenter({});

    presenter.goBack();
    await nextTick();

    expect(presenter.activeSlideIndex.value).toEqual(0);
  });

  it('can go forth and back', async () => {
    const presenter = usePresenter({});

    presenter.goForward();
    presenter.goBack();
    await nextTick();

    expect(presenter.activeSlideIndex.value).toEqual(0);
  });

  it('will not advance if it cannot advance', async () => {
    const presenter = usePresenter({});

    presenter.goForward();
    presenter.goForward();
    presenter.goForward();
    await nextTick();

    expect(presenter.activeSlideIndex.value).toEqual(2);
  });
});
