import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, cleanup, fireEvent } from '@testing-library/vue';
import { renderComponent } from '../../utils/test-util';
import SuggestButton from './SuggestButton.vue';

const getToggleButton = () => screen.getByTestId('suggest-toggle');
const getPromptInput = () => screen.queryByTestId('prompt-input');
const getCancelButton = () => screen.queryByTestId('cancel-button');
const getAcceptButton = () => screen.queryByTestId('accept-button');
const getAutomateButton = () => screen.queryByTestId('automate-button');

const clickToggleButton = async () => await fireEvent.click(getToggleButton());
const clickAccept = async () => await fireEvent.click(getAcceptButton());
const clickCancel = async () => await fireEvent.click(getCancelButton());
const clickAutomate = async () => await fireEvent.click(getAutomateButton());
const enterPrompt = async (prompt: string) => await fireEvent.update(getPromptInput(), prompt);

describe('SuggestButton', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('can be disabled', () => {
    renderComponent(SuggestButton, { disabled: true });

    expect(getToggleButton().getAttribute('disabled')).toBeDefined();
  });

  it('can be opened', async () => {
    renderComponent(SuggestButton);

    await clickToggleButton();

    expect(getPromptInput()).toBeDefined();
  });

  it('can forward accepted input', async () => {
    const prompt = "It really whips the llama's ass";
    const { emitted } = renderComponent(SuggestButton);

    await clickToggleButton();
    await enterPrompt(prompt);
    await clickAccept();

    expect(emitted('suggest')).toMatchObject([[prompt]]);
  });

  it('can cancel', async () => {
    const prompt = "It really whips the llama's ass";
    const { emitted } = renderComponent(SuggestButton);

    await clickToggleButton();
    await enterPrompt(prompt);
    await clickCancel();

    expect(emitted('suggest')).toBeUndefined();
  });

  it('accepts custom labels', () => {
    renderComponent(SuggestButton, { label: 'Test me, baby, one more time' });
    const labels = screen.queryAllByText('Test me, baby, one more time');

    expect(labels).not.toHaveLength(0);
  });

  it('has an automate button', async () => {
    const { emitted } = renderComponent(SuggestButton, { canAutomate: true });

    await clickToggleButton();
    await clickAutomate();

    expect(getAutomateButton()).toBeDefined();
    expect(emitted('automate')).toBeDefined();
  });
});
