// 注册事件
// 处理来自渲染进程的 IPC 请求
const { ipcMain, dialog } = require('electron')
const { getDirectoryTree } = require('./fileManager')
const { setTheme, getTheme, setDirectory, getDirectory } = require('./storage')
const fs = require('fs');
import * as path from 'path'


// 读取数据
function readFile(url:string){
  return new Promise(function (resolve, reject) {
    fs.readFile(url, function (err:any, data:any) {
      if (err) {
        console.log(err)
      }
      resolve(data.toString())
    })
  })
}

// 写入数据
function writeFile(url:string,data:any){
  return new Promise(function (resolve, reject) {
    fs.writeFile(url, data, (err:any) => {
      if (err) {
        console.log(err)
      }
      resolve(true)
    });
  })
}



export const setEvent = (mainWindow: any) => {
  // const theme = getTheme();
  // const directory = getDirectory();

  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow?.webContents.send('init-data', { theme, directory });
  // });

  ipcMain.handle('get-settings', () => {
    const theme = getTheme(); // 默认为 light
    const directory = getDirectory();
    return { theme, directory }; // 返回主题和目录数据
  });

  ipcMain.handle('get-theme', () => {
    return getTheme();
  });

  ipcMain.handle('get-directory', () => {
    return getDirectory();
  });

  ipcMain.handle('window-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.handle('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('change-theme', (event, theme) => {
    setTheme(theme); // 更新主题
    mainWindow?.webContents.send('init-data', { theme, directory: getDirectory() }); // 重新传递给渲染进程
  });

  ipcMain.on('change-directory', (event, directory) => {
    setDirectory(directory); // 更新目录
    mainWindow?.webContents.send('init-data', { theme: getTheme(), directory }); // 重新传递给渲染进程
  });

  ipcMain.handle('window-close', () => {
    mainWindow.close();
  });

  ipcMain.handle('get-directory-tree', (event, dirPath) => {
    try {
      return getDirectoryTree(dirPath);
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  ipcMain.handle('dialog:openDirectory', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],  // 选择目录
    });
    if (result.canceled) {
      return null;  // 用户取消了选择
    }
    return result.filePaths[0];  // 返回选择的目录路径
  });

  // 监听渲染进程的文件存在检查请求
  ipcMain.handle('check-file-existence', (event, filePath) => {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  });

  ipcMain.handle('read-file', async (event, filePath: string) => {
    const file = path.resolve(filePath);
    try {
      const content = await readFile(file);
      return content;
    } catch (error) {
      return null;
    }
  });
  ipcMain.handle('save-file', async (event, filePath: string, code) => {
    const file = path.resolve(filePath);
    try {
      const content = await writeFile(file, code);
      return content;
    } catch (error) {
      console.log(error)
      return null;
    }
  });
}