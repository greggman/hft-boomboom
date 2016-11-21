"use strict";

const isOSX = process.platform === 'darwin';
const isDevMode = process.env.NODE_ENV === 'development';

var optionSpec = {
  options: [
   { option: 'port', alias: 'p', type: 'Int',     description: 'port. Default 18679'},
   { option: 'dns',              type: 'Boolean', description: 'enable dns server'},
   { option: 'address',          type: 'String',  description: 'ip address for dns and controller url conversion'},
   { option: 'help', alias: 'h', type: 'Boolean', description: 'displays help'},
   { option: 'private-server',   type: 'Boolean', description: 'do not inform happyfuntimes.net about this server. Users will not be able to use happyfuntimes.net to connect to your games'},
   { option: 'debug',            type: 'Boolean', description: 'check more things'},
   { option: 'verbose',          type: 'Boolean', description: 'print more stuff'},
   { option: 'system-name',      type: 'String',  description: 'name used if multiple happyFunTimes servers are running on the same network. Default = computer name'},
  ],
  helpStyle: {
    typeSeparator: '=',
    descriptionSeparator: ' : ',
    initialIndent: 4,
  },
};

const optionator = require('optionator')(optionSpec);

try {
  var args = optionator.parse(process.argv);
} catch (e) {
  console.error(e);
  process.exit(1);  // eslint-disable-line
}

function printHelp() {
  console.log(optionator.generateHelp());
  process.exit(0);  // eslint-disable-line
}

if (args.help) {
  printHelp();
}

const happyfuntimes = require('happyfuntimes');
const electron = require('electron');
const querystring = require('querystring');
const webContents = electron.webContents;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let gameWindow = null;
let setupSteps = 2;
const state = {};

args.baseDir = __dirname;
happyfuntimes.start(args)
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
  const {width: screenWidth, height: screenHeight} = electron.screen.getPrimaryDisplay().workAreaSize;
  const space = 50;
  const x = space;
  const y = space;
  const width = screenWidth - space * 2;
  const height = screenHeight - space * 2;

  gameWindow = new BrowserWindow({
    fullscreen: !isDevMode,
    defaultEncoding: "utf8",
    x: x,
    y: y,
    width: width,
    height: height,
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

