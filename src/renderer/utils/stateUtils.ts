import { ipcRenderer } from "electron";

// 读取数据
export const loadData = async (name:string)=>{
  return await ipcRenderer.invoke(name)
}

// 保存数据
export const saveData = (name:string, data: any) =>{
  ipcRenderer.send(name, data);
}

// 读取文件
export const readFileSync = async (url:string) =>{
  return await ipcRenderer.invoke('read-file',url)
}

// 保存文件

export const saveFileSync = async (url:string, code:string|null) =>{
  return await ipcRenderer.invoke('save-file',url,code)
}