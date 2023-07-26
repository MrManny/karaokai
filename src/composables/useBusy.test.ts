import { describe, expect, it } from 'vitest';
import { useBusy } from './useBusy';

describe('useBusy', () => {
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
