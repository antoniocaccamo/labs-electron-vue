import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('exposing', {
  sendMessage: (message: string) => ipcRenderer.send('message', message),
//log: (message: string) => ipcRenderer.send('logMessage', message)
})
