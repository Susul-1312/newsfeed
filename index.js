const fs = require("fs");
const feedFiles = fs.readdirSync('./feeds').filter(file => file.endsWith('.js'));

const feeds = new Map(); // create a map so items can be stored with name but still be iterated over

for (const file of feedFiles) {
  const getFeed = require(`./feeds/${file}`);
  feeds.set(file.slice(0, -3), getFeed); // insert the function to get the feed
}

const { ipcMain, app, BrowserWindow } = require('electron');
const path = require("path")
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile('index.html')

  sendUpdates = () => {
    for (var [feed, getFeed] of feeds) {
      win.webContents.send("update-feed", {
        feed,
        entries: [...getFeed()].reverse(),
      })
    }
  }

  win.webContents.on('did-finish-load', sendUpdates)
  setInterval(sendUpdates, 1000)
})
