import { ipcMain } from 'electron';
import { setCredential, vaultKeys } from './credentials-vault';
import { Vault } from './ipc-keys';

ipcMain.handle(Vault.SetToken, (_, type: string, token: string) => {
  setCredential(type, token);
});

ipcMain.handle(Vault.GetKeys, () => {
  return vaultKeys();
});
