import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import log from 'electron-log/main';
import { join } from 'path';
import app_menu from './menu'

log.initialize();
const isMac = process.platform === 'darwin';

class Electron {

  constructor() {
    this.createWindow()
    log.info(`running on Mac? ${isMac}`)
  }

  private async createWindow() {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
      }
    });
  
    if (process.env.NODE_ENV === 'development') {
      const rendererPort = process.argv[2];
      mainWindow.loadURL(`http://localhost:${rendererPort}`);
      mainWindow.webContents.openDevTools();

    }
    else {
      mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
    }
  }
}


app.whenReady().then(() => {
  Menu.setApplicationMenu(app_menu);   
  new Electron();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    new Electron();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') 
    app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
});

ipcMain.on('logMessage', (event, message) => {
  console.log("logging: " + message);
})


