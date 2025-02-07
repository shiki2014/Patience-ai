import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { Button, Tree } from "antd";
import { FileOutlined, FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import { Key } from "react";
import { loadData } from "../utils/stateUtils";
// 定义组件接收的属性类型

interface FileNode {
  name: string;
  type: "file" | "directory";
  path: string;
  key: string;
  children?: FileNode[];
}

const FileExplorer: React.FC<{
  setSelectedFile: (newValue: string) => void;
}> = ({ setSelectedFile }) => {
  const [currentDir, setCurrentDir] = useState<string | null>(null); // 当前目录
  const [fileTree, setFileTree] = useState<FileNode[]>([]); // 文件树数据
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]); // 控制展开的节点，类型为 Key[]
  useEffect(function () {
    const fetchSettings = async () => {
      const currentDir = await loadData('get-directory');
        setCurrentDir(currentDir);
        if (currentDir) {
          loadDirectoryTree(currentDir);
        }
      };
    fetchSettings();
  }, [currentDir]);

  // 加载目录树
  const loadDirectoryTree = async (dir: string) => {
    const tree = await ipcRenderer.invoke("get-directory-tree", dir);
    setFileTree(tree);
  };

  // 处理文件点击
  const handleFileClick = (file: FileNode) => {
    if (file.type === "file") {
      setSelectedFile(file.path); // 更新选中的文件
    } else {
      // 如果是文件夹，展开/收起该文件夹
      const newExpandedKeys = [...expandedKeys];
      const index = newExpandedKeys.indexOf(file.path);

      if (index === -1) {
        // 如果文件夹当前未展开，则展开它
        newExpandedKeys.push(file.path);
      } else {
        // 如果文件夹已展开，则收起它
        newExpandedKeys.splice(index, 1);
      }

      setExpandedKeys(newExpandedKeys); // 更新展开的节点
    }
  };

  // 处理文件夹点击
  const handleFolderClick = async (folder: FileNode) => {
    if (folder.type === "directory") {
      loadDirectoryTree(folder.path);
    }
  };

  // 选择目录
  const handleSelectDirectory = async () => {
    try {
      // 向主进程发送打开目录选择框的请求
      const directoryPath = await ipcRenderer.invoke("dialog:openDirectory");
      if (directoryPath) {
        setCurrentDir(directoryPath); // 更新选中的目录
        ipcRenderer.send('change-directory', directoryPath);
      } else {
        console.log("No directory selected or selection was canceled");
      }
    } catch (error) {
      console.error("Failed to open directory dialog:", error);
    }
  };

  // 转换文件树结构为 Tree 组件所需的数据格式
  const renderTreeNodes = (data: FileNode[]): any[] => {
    return data.map((node) => {
      const isExpanded = expandedKeys.includes(node.path);
      if (node.type === "directory") {
        return {
          title: (
            <span>
              {isExpanded ? (
                <FolderOpenOutlined style={{ marginRight: 8 }} />
              ) : (
                <FolderOutlined style={{ marginRight: 8 }} />
              )}
              {node.name}
            </span>
          ),
          key: node.path,
          path: node.path,
          type: node.type,
          children: node.children ? renderTreeNodes(node.children) : [],
        };
      }
      return {
        title: (
          <span>
            <FileOutlined style={{ marginRight: 8 }} />
            {node.name}
          </span>
        ),
        key: node.path,
        path: node.path,
        type: node.type,
        isLeaf: true,
      };
    });
  };
  // 处理展开节点
  const handleExpand = (
    expandedKeys: Key[],
    { expanded, node }: { expanded: boolean; node: any }
  ) => {
    // 更新展开的节点
    setExpandedKeys(expandedKeys);
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "100%", padding: "10px" }}>
        <Button onClick={handleSelectDirectory}>选择目录</Button>
        <div style={{ marginTop: "20px" }}>
          <Tree
            multiple={false}
            treeData={renderTreeNodes(fileTree)}
            expandedKeys={expandedKeys} // 控制展开的节点
            onExpand={handleExpand} // 当节点展开时更新展开的节点
            onSelect={(selectedKeys, { node }: { node: any }) => {
              // 使用类型断言确保 node 为 FileNode 类型
              const fileNode = node as FileNode;
              // 直接通过是否有 children 判断是否为叶子节点
              if (fileNode.children && fileNode.children.length > 0) {
                handleFileClick(fileNode);
              } else {
                handleFileClick(fileNode);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
