import { ipcRenderer } from 'electron';

export function useElectron() {
  const quit = () => {
    ipcRenderer.send('quit');
  };

  return {
    quit,
  };
}
