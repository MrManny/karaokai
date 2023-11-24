import { computed, ref } from 'vue';

interface TimerProps {
  dueTimer?: number;
  timePerTick: number;
  onTick?: () => void;
  onTickDue?: () => void;
}

export function useTimer({ dueTimer = 3_000, onTick, onTickDue, timePerTick }: TimerProps) {
  const tickInterval = ref<NodeJS.Timeout | undefined>(undefined);
  const dueTimeout = ref<NodeJS.Timeout | undefined>(undefined);

  const isRunning = computed(() => tickInterval.value !== undefined);

  const stop = () => {
    if (!isRunning.value) return;
    clearInterval(tickInterval.value);
    tickInterval.value = undefined;
    clearTimeout(dueTimeout.value);
    dueTimeout.value = undefined;
  };

  const start = () => {
    stop();
    const timeBeforeDue = Math.max(0, timePerTick - dueTimer);
    const due = () => {
      dueTimeout.value = setTimeout(() => {
        onTickDue?.();
      }, timeBeforeDue);
    };
    tickInterval.value = setInterval(() => {
      onTick?.();
      due();
    }, timePerTick);
    dueTimeout.value = setTimeout(() => due(), timeBeforeDue);
  };

  return {
    isRunning,
    start,
    stop,
  };
}
