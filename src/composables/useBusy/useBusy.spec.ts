import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useBusy } from './useBusy';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';

describe('useBusy', () => {
  beforeEach(() => {
    const fakePinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        pending: 0,
      },
    });
    setActivePinia(fakePinia);
  });

  it('should have a boolean busy indicator which is not busy by default', async () => {
    // arrange
    const { isBusy } = useBusy();

    // assert
    expect(isBusy.value).toBe(false);
  });

  it('should have a boolean busy indicator which is busy during ops', async () => {
    // arrange
    const { isBusy, op } = useBusy();

    // act
    const pending = op(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 500);
        })
    );
    const busyThen = isBusy.value;
    await pending;
    const busyNow = isBusy.value;

    // assert
    expect(busyThen).toBe(true);
    expect(busyNow).toBe(false);
  });
});
