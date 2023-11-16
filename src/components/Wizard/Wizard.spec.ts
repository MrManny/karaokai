import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { cleanup, screen } from '@testing-library/vue';
import { renderComponent } from '../../utils/test-util';
import Wizard from './Wizard.vue';

const routerPushMock = vi.fn();
const findTopicMock = vi.fn();
const generateImageMock = vi.fn();
const generateTextMock = vi.fn();
const opMock = vi.fn();
const isBusyMock = vi.fn().mockReturnValue(false);
vi.mock('../../composables/useBusy', () => ({
  useBusy: vi.fn().mockImplementation(() => ({
    op: opMock,
    isBusy: isBusyMock,
  })),
}));
vi.mock('../../composables/useSlideBuilder', () => ({
  useSlideBuilder: vi.fn().mockImplementation(() => ({
    findTopic: findTopicMock,
    generateImage: generateImageMock,
    generateText: generateTextMock,
  })),
}));
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

const getTopicInput = () => screen.getByTestId<HTMLInputElement>('topic-input');
const getSlidesAmount = () => screen.getByTestId<HTMLDivElement>('slides-length-input');
const getImagesAmount = () => screen.getByTestId<HTMLDivElement>('image-number-input');
//const getProgressBar = () => screen.queryByTestId('generate-progress-bar');
const getGenerateButton = () => screen.getByTestId<HTMLButtonElement>('generate-button');

describe('Wizard', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('has an input for topic', () => {
    renderComponent(Wizard);

    expect(getTopicInput()).toBeDefined();
  });

  it('has an input for slides', () => {
    renderComponent(Wizard);

    expect(getSlidesAmount()).toBeDefined();
  });

  it('has an input for images', () => {
    renderComponent(Wizard);

    expect(getImagesAmount()).toBeDefined();
  });

  it('has a button for generation', () => {
    renderComponent(Wizard);

    expect(getGenerateButton()).toBeDefined();
  });

  // TODO
});
