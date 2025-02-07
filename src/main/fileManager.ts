import fs from 'fs';
import path from 'path';

// 获取指定目录的文件树结构
export const getDirectoryTree = (dirPath: string): any => {
    const result: any[] = [];
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            result.push({
                name: item,
                type: 'directory',
                path: fullPath,
                children: getDirectoryTree(fullPath), // 递归读取子目录
            });
        } else {
            result.push({
                name: item,
                type: 'file',
                path: fullPath,
            });
        }
    }

    return result;
};
