"use strict";

const isOSX = process.platform === 'darwin';
const isDevMode = process.env.NODE_ENV === 'development';

const happyfuntimes = require('happyfuntimes');
const electron = require('electron');
const querystring = require('querystring');
const webContents = electron.webContents;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let gameWindow = null;
let setupSteps = 2;
const state = {};

happyfuntimes.start({
  // port: 18679,
  // dns: true,
  // address: 127.0.0.1,
  // verbose: true,
  // debug: true,
  // system-name: 'MyGameSystem',
  // private-server: true,
})
.then((ports) => {
  console.log("Listening on ports:", ports);
  state.ports = ports;
  state.port = ports[0];
  startIfReady();
})
.catch((err) => {
  console.error("error starting server:", err);
});

function createWindow() {
  gameWindow = new BrowserWindow({
    fullscreen: !isDevMode,
    defaultEncoding: "utf8",
  });

  const settings = {
    hftUrl: 'ws://localhost:' + state.port,
  };
  const settingsStr = querystring.stringify(settings);
  gameWindow.loadURL(`file://${__dirname}/game.html?${settingsStr}`);
  if (isDevMode) {
    gameWindow.webContents.openDevTools();
  }
}

function startIfReady() {
  --setupSteps;
  if (setupSteps === 0) {
    setupMenus();
    createWindow();
  }
}

app.on('ready', () => {
  startIfReady();
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

