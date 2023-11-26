import { describe, expect, it } from 'vitest';
import Button from 'primevue/button';
import SlidePagination from './SlidePagination.vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

const getBackButton = (wrapper: VueWrapper) => wrapper.find('[data-testid=slide-go-back]');
const getNextButton = (wrapper: VueWrapper) => wrapper.find('[data-testid=slide-go-next]');
const getGotoButton = (wrapper: VueWrapper, buttonIndex: number) =>
  wrapper.find(`[data-testid=slide-go-to-${buttonIndex}]`);
const getNewButton = (wrapper: VueWrapper) => wrapper.find('[data-testid=slide-new]');
const getPlayButton = (wrapper: VueWrapper) => wrapper.find('[data-testid=slide-play]');
const getPaginationButtons = (wrapper: VueWrapper) => wrapper.findAll('.paginator button');

describe('SlidePagination', () => {
  it('renders correctly', () => {
    const wrapper = mount(SlidePagination, {
      props: {
        activeSlideIndex: 1,
        canGoForward: true,
        canGoBack: true,
        slides: 3,
      },
      global: {
        stubs: {
          Button,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct number of slide buttons', () => {
    const wrapper = mount(SlidePagination, {
      props: {
        activeSlideIndex: 0,
        canGoForward: true,
        canGoBack: false,
        slides: 5,
      },
      global: {
        stubs: {
          Button,
        },
      },
    });

    const buttons = getPaginationButtons(wrapper);
    expect(buttons.length).toBe(5);
  });

  it('emits new event when new button is clicked', async () => {
    const wrapper = mount(SlidePagination, {
      props: {
        activeSlideIndex: 1,
        canGoForward: true,
        canGoBack: true,
        slides: 3,
      },
      global: {
        stubs: {
          Button,
        },
      },
    });

    await getNewButton(wrapper).trigger('click');
    expect(wrapper.emitted('new')).toBeTruthy();
  });

  it('emits play event when play button is clicked', async () => {
    const wrapper = mount(SlidePagination, {
      props: {
        activeSlideIndex: 1,
        canGoForward: true,
        canGoBack: true,
        slides: 3,
      },
      global: {
        stubs: {
          Button,
        },
      },
    });

    await getPlayButton(wrapper).trigger('click');
    expect(wrapper.emitted('play')).toBeTruthy();
  });

  it('emits goBack event when previous button is clicked', async () => {
    const wrapper = mount(SlidePagination, {
      props: {
        activeSlideIndex: 1,
        canGoForward: true,
        canGoBack: true,
        slides: 3,
      },
      global: {
        stubs: {
          Button,
        },
      },
    });

    await getBackButton(wrapper).trigger('click');
    expect(wrapper.emitted('goBack')).toBeTruthy();
  });

  it('emits goNext event when next button is clicked', async () => {
    const wrapper = mount(SlidePagination, {
      props: {
        activeSlideIndex: 1,
        canGoForward: true,
        canGoBack: true,
        slides: 3,
      },
      global: {
        stubs: {
          Button,
        },
      },
    });

    await getNextButton(wrapper).trigger('click');
    expect(wrapper.emitted('goForward')).toBeTruthy();
  });

  it('emits goTo event with correct index when a slide button is clicked', async () => {
    const wrapper = mount(SlidePagination, {
      props: {
        activeSlideIndex: 0,
        canGoForward: true,
        canGoBack: true,
        slides: 3,
      },
      global: {
        stubs: {
          Button,
        },
      },
    });

    await getGotoButton(wrapper, 1).trigger('click');
    expect(wrapper.emitted('goTo')).toBeTruthy();
    expect(wrapper.emitted('goTo')[0]).toEqual([1]);
  });
});
