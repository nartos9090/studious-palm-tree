const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
    helloDialog: () => ipcRenderer.send('hello')
})