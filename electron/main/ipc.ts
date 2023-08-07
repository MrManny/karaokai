import { BrowserWindow, ipcMain } from 'electron';
import { indexHtml, preload, url } from './paths';
import './ipc-gpt';
import './ipc-sdxl';
import './ipc-vault';

ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    void childWindow.loadURL(`${url}#${arg}`);
  } else {
    void childWindow.loadFile(indexHtml, { hash: arg });
  }
});
