import { onBeforeUnmount } from 'vue';

type KeyboardAction = {
  key: string;
  then: (ev: KeyboardEvent) => void;
};

export function useKeyDown(actions: KeyboardAction[]) {
  const handler = (ev: KeyboardEvent) => {
    const action = actions.find((action) => action.key === ev.key);
    action?.then(ev);
  };

  window.addEventListener('keydown', handler);
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handler);
  });
}
