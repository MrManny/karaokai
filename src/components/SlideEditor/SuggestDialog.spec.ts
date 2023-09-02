import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/vue';
import { renderComponent } from '../../utils/test-util';
import SuggestDialog from './SuggestDialog.vue';
import { nextTick } from 'vue';

const getCancelButton = (): HTMLButtonElement => screen.queryByTestId('cancel-button');
const getAcceptButton = (): HTMLButtonElement => screen.queryByTestId('accept-button');
const getGuidance = () => screen.queryByTestId('guidance');
const getPromptInput = (): HTMLTextAreaElement => screen.queryByTestId('prompt-input');
const getExamples = () => screen.queryAllByTestId('example');
const sleepOneTick = () => new Promise<void>((resolve) => nextTick(() => resolve()));

const renderVisibleDialog = async (props: Record<string, unknown> = {}) => {
  const rendered = renderComponent(SuggestDialog, { ...props, isDialogVisible: true });
  await sleepOneTick();
  return rendered;
};

describe('SuggestDialog', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('accepts an initial prompt', async () => {
    await renderVisibleDialog({ initialPrompt: 'this be test' });

    expect(getPromptInput().value).toEqual('this be test');
  });

  it('can list examples', async () => {
    await renderVisibleDialog({ examples: ['This is an example', 'So is this'] });

    const examples = getExamples();
    expect(examples).toHaveLength(2);
    expect(examples[0].textContent).toEqual('This is an example');
    expect(examples[1].textContent).toEqual('So is this');
  });

  it('can provide guidance', async () => {
    await renderVisibleDialog({ guidance: 'Let me guide you, youngling' });

    expect(getGuidance().textContent).toEqual('Let me guide you, youngling');
  });

  it('allows text input', async () => {
    await renderVisibleDialog();

    await fireEvent.update(getPromptInput(), 'I am a prompt');

    expect(getPromptInput().value).toEqual('I am a prompt');
  });

  it('trims the text input', async () => {
    await renderVisibleDialog();

    await fireEvent.update(getPromptInput(), '\tI am a prompt  ');

    expect(getPromptInput().value).toEqual('I am a prompt');
  });

  it('has a cancel button', async () => {
    const { emitted } = await renderVisibleDialog();

    await fireEvent.click(getCancelButton());

    expect(emitted('close')).toEqual([[]]);
    expect(emitted('suggest')).toBeUndefined();
  });

  it('has an accept button', async () => {
    const { emitted } = await renderVisibleDialog();

    await fireEvent.update(getPromptInput(), 'Yaaay');
    await fireEvent.click(getAcceptButton());

    expect(emitted('close')).toBeUndefined();
    expect(emitted('suggest')).toEqual([['Yaaay']]);
  });
});
