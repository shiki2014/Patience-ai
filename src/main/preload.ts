const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  window.electronAPI = {
    onSaveKeys:(callback: (arg0: any) => void) => ipcRenderer.on('save', (_event, value) => callback(value)),
    offSaveKeys:() => ipcRenderer.removeAllListeners('save')
  }
})