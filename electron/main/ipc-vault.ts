import { ipcMain } from 'electron';
import { setCredential } from './credentials-vault';

const SetToken = 'set-token' as const;

ipcMain.handle(SetToken, (_, type: string, token: string) => {
  setCredential(type, token);
});
