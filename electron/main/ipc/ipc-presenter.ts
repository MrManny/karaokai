import { BrowserWindow, ipcMain } from 'electron';

ipcMain.handle('set-fullscreen', ({ sender }, value: boolean) => {
  const window = BrowserWindow.fromWebContents(sender);
  if (!window) return;
  window.setFullScreen(value);
});
