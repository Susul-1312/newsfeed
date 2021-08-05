// this just exposes the feed updater function
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('feedUpdate', {
  handleUpdate: (callback) => {
    ipcRenderer.on("update-feed", (event, data) => {
      callback(data)
    })
  }
})
