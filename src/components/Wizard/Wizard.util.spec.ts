import { afterEach, describe, expect, it, vi } from 'vitest';
import { insertIntroAndOutro, loadBackupImages, pickRandomNumbers } from './Wizard.util';
import { ipcRenderer } from 'electron';
import type { Slide } from '../../types/slide-schema';

vi.mock('electron', () => ({
  ipcRenderer: {
    invoke: vi.fn(),
  },
}));

describe('Wizard.util', () => {
  describe('loadBackupImages', () => {
    afterEach(() => {
      vi.resetAllMocks();
    });

    it('returns an empty array if no path is specified', async () => {
      const images = await loadBackupImages('', 3);

      expect(images).toHaveLength(0);
    });

    it('returns an empty array if howMany is zero', async () => {
      const images = await loadBackupImages('tmp', 0);

      expect(images).toHaveLength(0);
    });

    it('returns an empty array if howMany is negative', async () => {
      const images = await loadBackupImages('tmp', -4);

      expect(images).toHaveLength(0);
    });

    it('invokes an IPC call if images are to be retrieved', async () => {
      ipcRenderer.invoke.mockResolvedValueOnce(['test1', 'test2']);

      const images = await loadBackupImages('tmp', 2);

      expect(ipcRenderer.invoke).toHaveBeenCalledWith('pick-random-images', 'tmp', 2);
      expect(images).toHaveLength(2);
      expect(images).toMatchObject(['test1', 'test2']);
    });
  });

  describe('pickRandomNumbers', () => {
    it('can pick random numbers between 0 and any positive integer with no duplicates', () => {
      const numbers = pickRandomNumbers(3, 10);
      const [num1, num2, num3] = numbers;

      expect(numbers).toHaveLength(3);
      // duplicate check:
      expect(new Set(numbers).size).toEqual(3);

      expect(num1).toBeGreaterThanOrEqual(0);
      expect(num1).toBeLessThan(10);
      expect(num2).toBeGreaterThanOrEqual(0);
      expect(num2).toBeLessThan(10);
      expect(num3).toBeGreaterThanOrEqual(0);
      expect(num3).toBeLessThan(10);
    });

    it('returns all available numbers of more are requested than present', () => {
      const numbers = pickRandomNumbers(5, 2);

      expect(numbers).toMatchObject([0, 1]);
    });
  });

  describe('insertIntroAndOutro', () => {
    const firstSlide: Slide = { text: { text: 'Lorem ipsum' } };
    const secondSlide: Slide = { image: { base64: 'l0r3m1p5um' } };

    it('can inject intro and outro slides', () => {
      const slides: Slide[] = [firstSlide, secondSlide];
      const amended = insertIntroAndOutro('Bananas in space', slides);

      expect(amended).toHaveLength(4);
      expect(amended[0]).toHaveProperty('layout', 'intro');
      expect(amended[0].text).toMatchObject({ text: 'Bananas in space' });
      expect(amended[1]).toMatchObject(firstSlide);
      expect(amended[2]).toMatchObject(secondSlide);
      expect(amended[3]).toHaveProperty('layout', 'outro');
      expect(amended[3]).toHaveProperty('text');
    });
  });
});
