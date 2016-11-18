"use strict";

const isOSX = process.platform === 'darwin';
const isDevMode = process.env.NODE_ENV === 'development';

const happyfuntimes = require('happyfuntimes');
const electron = require('electron');
const webContents = electron.webContents;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let gameWindow = null;

//electron.ipcMain.on('start', (event, arg) => {
//  event.sender.send('start', args);
//});

function createWindow() {
  gameWindow = new BrowserWindow({
    fullscreen: !isDevMode,
    defaultEncoding: "utf8",
  });

  gameWindow.loadURL(`file://${__dirname}/game.html`);
  if (isDevMode) {
    gameWindow.webContents.openDevTools();
  }
}

app.on('ready', () => {
  setupMenus();
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

function setupMenus() {
  const menuTemplate = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: isOSX ? 'Ctrl+Command+F' : 'F11',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: isOSX ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.toggleDevTools();
          }
        },
      ]
    },
  ];


  if (isOSX) {
    const name = electron.app.getName();
    menuTemplate.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() { app.quit(); }
        },
      ]
    });
  }

  const menu = electron.Menu.buildFromTemplate(menuTemplate);
  electron.Menu.setApplicationMenu(menu);
}

