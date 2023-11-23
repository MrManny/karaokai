import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import SlideProgress from './SlideProgress.vue';

const getSegments = (wrapper: VueWrapper) => {
  return wrapper.findAll('.segment');
};

const getProgress = (wrapper: VueWrapper) => {
  return wrapper.find('.progress').text();
};

const assertProgress = (wrapper: VueWrapper, nowOnSlide: number, totalSlides: number) => {
  const expectedProgress = `${nowOnSlide + 1} / ${totalSlides}`;
  const segments = getSegments(wrapper);

  expect(segments).toHaveLength(totalSlides);
  for (let i = 0; i < nowOnSlide && i < totalSlides; i++) {
    expect(segments[i].classes()).toContain('past');
  }
  if (nowOnSlide < totalSlides) {
    expect(segments[nowOnSlide].classes()).toContain('active');
  }
  expect(getProgress(wrapper)).toEqual(expectedProgress);
};

describe('SlideProgress.vue', () => {
  it('renders with default props', () => {
    const wrapper = shallowMount(SlideProgress);
    assertProgress(wrapper, 0, 0);
  });

  it('renders with custom props', () => {
    const wrapper = shallowMount(SlideProgress, {
      props: { activeSlide: 2, totalSlides: 5 },
    });
    assertProgress(wrapper, 2, 5);
  });

  it('applies correct classes based on activeSlide', () => {
    const wrapper = shallowMount(SlideProgress, {
      props: { activeSlide: 2, totalSlides: 5 },
    });
    assertProgress(wrapper, 2, 5);
  });

  it('computes gridCss correctly', () => {
    const wrapper = shallowMount(SlideProgress, {
      props: { totalSlides: 5 },
    });
    expect(wrapper.find('.slide-progress').attributes('style')).toContain('grid-template-columns: repeat(6, 1fr)');
  });

  it('generates the correct slideNumbers array', () => {
    const wrapper = shallowMount(SlideProgress, {
      props: { totalSlides: 3 },
    });
    const expectedNumbers = [0, 1, 2];
    expect(wrapper.vm.slideNumbers).toEqual(expectedNumbers);
  });
});
