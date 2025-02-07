// electron-env.d.ts
export interface IElectronAPI {
	// onSaveKeys 方法时preload.ts中使用的方法，后面添加方法，此处也要同步申明
  onSaveKeys: (callback: (arg0: any) => void) => {},
  offSaveKeys: () => {}
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
