import React, { useState, useRef, useEffect } from "react";
import FileExplorer from "./components/FileExplorer"; // 记得修改为从 components 文件夹引入
import { Button, Flex } from "antd";
import CodeEditor from './components/CodeEditor';


const App_container: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>(''); // 选中的文件
  const [leftWidth, setLeftWidth] = useState(300); // 初始宽度
  const isDragging = useRef(false); // 用来标记拖动状态
  const startX = useRef(0); // 用来存储拖动时的起始位置
  const leftPanelRef = useRef<HTMLDivElement>(null); // 用于引用左侧面板
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX; // 记录鼠标按下时的 X 坐标
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current; // 计算鼠标的位移
    const newLeftWidth = leftWidth + diff; // 根据位移调整左侧区域宽度
    // 只在有实际改变的时候进行更新
    if (newLeftWidth >= 100 && newLeftWidth <= 800) {
      // 使用 requestAnimationFrame 来优化性能
      requestAnimationFrame(() => {
        if (leftPanelRef.current) {
          leftPanelRef.current.style.width = `${newLeftWidth}px`; // 直接更新 DOM
        }
      });
    }
  };
  const onMouseUp = () => {
    isDragging.current = false; // 停止拖动
    if (leftPanelRef.current) {
      setLeftWidth(leftPanelRef.current.offsetWidth); // 更新状态，停止拖动
    }
  };
  // 监听鼠标事件
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [leftWidth]);
  return (
    <div className="app-container">
      {/* 左侧文件管理器 */}
      <div
        className="file-explorer left-panel"
        ref={leftPanelRef}
        style={{ width: `${leftWidth}px` }}
      >
        <FileExplorer setSelectedFile={setSelectedFile} />
      </div>
      <div className="divider" onMouseDown={onMouseDown}></div>
      {/* 右侧文件编辑器 */}
      <div className="file-editor right-panel">
        {selectedFile ? (
          <div className="editor-container">
            <h3>编辑文件: {selectedFile}</h3>
            {/* 这里可以后续集成 Monaco Editor 或其他编辑器 */}
            <CodeEditor filePath={selectedFile} />
          </div>
        ) : (
          <div className="empty-editor">
            <p>请在左侧选择文件进行编辑</p>
            <Flex gap="small" wrap>
              <Button type="primary">Primary Button</Button>
              <Button>Default Button</Button>
              <Button type="dashed">Dashed Button</Button>
              <Button type="text">Text Button</Button>
              <Button type="link">Link Button</Button>
            </Flex>
          </div>
        )}
      </div>
    </div>
  );
};

export default App_container;
