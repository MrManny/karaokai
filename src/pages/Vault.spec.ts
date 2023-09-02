import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup } from '@testing-library/vue';
import { renderComponent, sleep } from '../utils/test-util';
import Vault from './Vault.vue';

const vaultKeysMock = vi.fn();
const vaultSetMock = vi.fn();
vi.mock('../composables/useVault', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual('../composables/useVault');
  return {
    ...actual,
    useVault: vi.fn().mockImplementation(() => ({
      keys: vaultKeysMock.mockResolvedValue(['openai', 'stabilityai']),
      set: vaultSetMock,
    })),
  };
});

describe('Vault', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should check which keys are present upon mounting', async () => {
    renderComponent(Vault);

    await sleep(100);

    expect(vaultKeysMock).toHaveBeenCalled();
  });
});
