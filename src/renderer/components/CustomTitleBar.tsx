import React from 'react';
import ThemeToggle from './ThemeToggle';  // 引入自定义标题栏

import { ipcRenderer } from 'electron';

const CustomTitleBar: React.FC<{ updateTheme: (newValue: string) => void }> = ({ updateTheme }) => {
    const handleClose = () => {
        ipcRenderer.invoke('window-close');  // 请求主进程关闭窗口
    };

    const handleMinimize = () => {
        ipcRenderer.invoke('window-minimize');  // 请求主进程最小化窗口
    };

    const handleMaximize = () => {
        ipcRenderer.invoke('window-maximize');  // 请求主进程最大化/还原窗口
    };

    return (
        <div className="custom-title-bar">
          <ThemeToggle updateTheme={updateTheme}/>
          {/* <div className="window-buttons">
            <button onClick={handleMinimize}>_</button>
            <button onClick={handleMaximize}>☐</button>
            <button onClick={handleClose}>×</button>
          </div> */}
        </div>
    );
};

export default CustomTitleBar;
