// src/storage.ts
import Store from 'electron-store';

// 创建 electron-store 实例
const store:any = new Store();

// 存储或获取一个属性
const setItem = (key: string, value: any) => {
    store.set(key, value);
};

const getItem = (key: string) => {
    return store.get(key);
};

// 删除属性
const removeItem = (key: string) => {
    store.delete(key);
};

// 清除所有存储的数据
const clearAll = () => {
    store.clear();
};

// 示例: 获取主题和文件目录
const getTheme = () => {
    return getItem('theme') || 'light'; // 默认主题为 'light'
};

const setTheme = (theme: string) => {
    setItem('theme', theme);
};

const getDirectory = () => {
    return getItem('directory') || ''; // 默认目录为空
};

const setDirectory = (directory: string) => {
    setItem('directory', directory);
};

export { getTheme, setTheme, getDirectory, setDirectory };
