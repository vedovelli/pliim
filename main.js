const { ipcMain, dialog, shell, Menu, app } = require('electron')
const { turnOff, turnOn } = require('./lib/presentationMode')
const AutoLaunch = require('auto-launch');

const menubar = require("menubar")

const path = require('path')
const fs = require('fs')

const mb = menubar({
  preloadWindow: true,
  width: 360,
  height: 320,
  transparent: true,
  frame: false,
  icon: app.getAppPath() + "/img/icon.png"
});

mb.on("ready", function ready() {
  console.log("app is ready");

  ipcMain.on('turnOn', (event, options) => {
    console.log("turnon")
    turnOn(options, app.getAppPath())
  });

  ipcMain.on('turnOff', (event) => {
    console.log("Turnoff")
    turnOff(app.getAppPath())
  });

  //mb.window.openDevTools()
});

const pliimAutoLauncher = new AutoLaunch({
  name: 'Pliim',
  path: '/Applications/Pliim.app',
});

pliimAutoLauncher.enable();

//minecraftAutoLauncher.disable();

pliimAutoLauncher.isEnabled()
.then(function(isEnabled){
  if(isEnabled){
      return;
  }
  pliimAutoLauncher.enable();
})
.catch(function(err){
    // handle error
});