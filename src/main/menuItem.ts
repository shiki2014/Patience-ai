const { Menu, MenuItem } = require('electron')
export const setMenuItem = (mainWindow: any) => {
  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Electron',
    accelerator: 'Ctrl+S',
    click: () => {
      mainWindow.webContents.send('save')
    }
  }))

  Menu.setApplicationMenu(menu)
}
