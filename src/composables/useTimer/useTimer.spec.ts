import { describe, expect, it, vi } from 'vitest';
import { useTimer } from './useTimer';

describe('useTimer', () => {
  vi.useFakeTimers();

  it('isRunning should be false initially', () => {
    const { isRunning } = useTimer({ timePerTick: 1000 });
    expect(isRunning.value).toBe(false);
  });

  it('should call onTick at specified intervals', () => {
    const onTick = vi.fn();
    const { start } = useTimer({ timePerTick: 1000, onTick });
    start();
    vi.advanceTimersByTime(3000); // Advance time by 3000ms
    expect(onTick).toHaveBeenCalledTimes(3);
  });

  it('stop should stop the timer', () => {
    const { isRunning, start, stop } = useTimer({ timePerTick: 1000 });
    start();
    stop();
    expect(isRunning.value).toBe(false);
  });
});
