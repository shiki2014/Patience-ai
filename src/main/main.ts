// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const { setEvent } = require('./event')
const { setMenuItem } = require('./menuItem')
let mainWindow: any;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    // frame: false,  // 禁用默认的窗口边框
    // frame: false, // 保留默认标题栏
    backgroundColor: '#fff',  // 设置窗口背景颜色
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 40
    },
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程中使用 Node.js API
      contextIsolation: false, // 禁用上下文隔离（为了使用 React DevTools）
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载快捷键菜单
  // 加载 index.html
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // 打开开发工具
  mainWindow.webContents.openDevTools()

}


// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
  setEvent(mainWindow)
  setMenuItem(mainWindow)
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})






