import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { message } from 'antd';
import { readFileSync, saveFileSync } from '../utils/stateUtils'

import { useRef } from 'react'
/////////////////////
import * as monaco from 'monaco-editor';
import Editor, { loader } from '@monaco-editor/react';
import { loadData } from "../utils/stateUtils";

loader.config({ monaco });

interface CodeEditorProps {
  filePath: string; // 文件路径
}

const CodeEditor: React.FC<CodeEditorProps> = ({ filePath }) => {
  monaco.editor.defineTheme('dark', {
    base: 'vs-dark',  // 以哪个默认主题为基础："vs" | "vs-dark" | "hc-black" | "hc-light"
    inherit: true,
    rules: [],
    colors: {
        'editor.background': '#141414', // 背景颜色
    }
  })
  monaco.editor.defineTheme('light', {
      base: 'vs',  // 以哪个默认主题为基础："vs" | "vs-dark" | "hc-black" | "hc-light"
      inherit: true,
      rules: [],
      colors: {
          'editor.background': '#ffffff', // 背景颜色
      }
  })

  const [messageApi, contextHolder] = message.useMessage();
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [theme, setTheme] = useState("light");
  const [saved, setSaved] = useState(true);
  const editorRef = useRef<any>(null); // 创建一个 ref 来引用 Monaco Editor 实例
  // 只允许打开js文件
  const isJSFile = filePath && filePath.endsWith('.js');
  const handleSave = async () => {
    try {
      // this.monacoEditor.getValue()
      // const code = editorRef.current.getValue();// 获取 Monaco Editor 的内容
      await saveFileSync(filePath, fileContent);
      console.log('文件保存成功！');
      setSaved(true)
      // 可以添加保存成功的提示信息
    } catch (err) {
      console.error('保存文件出错：', err);
      // 可以添加保存失败的提示信息
    }
  };
  async function getThemeData(){
    let currentTheme = await loadData('get-theme');
    if (currentTheme){
      setTheme(currentTheme);
      monaco.editor.setTheme(theme == 'dark'? 'dark' :'light')
    }
  }
  getThemeData()

  ipcRenderer.on('init-data', (event, data) => {
    setTheme(data.theme);
    monaco.editor.setTheme(theme == 'dark'? 'dark' :'light')
  });

  // 读取文件内容（可以通过 Electron 的 IPC 调用文件内容）
  useEffect(() => {
    if (filePath && isJSFile) {
      // 在这里通过 Electron IPC 或其他方式读取文件内容
      // 假设我们通过文件路径获取文件内容
      fetchFileContent(filePath);
    }
  }, [filePath]);

  useEffect(() => {
    window.electronAPI?.onSaveKeys((value:any) => {
      handleSave();
    })
    return () => {
      window.electronAPI?.offSaveKeys();
    }
  }, [fileContent]);
  const fetchFileContent = async (path: string) => {
    try {
      const response = await readFileSync(path);
      setFileContent(response);
    } catch (error:any) {
      messageApi.open({
        type: 'error',
        content: error,
      });
    }
  };

  const handleEditorChange = (value: any) => {
    setSaved(false)
    setFileContent(value)
  };

  if (!isJSFile) {
    return <div>只能打开 .js 文件</div>;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div>{saved?'已保存':'未保存'}</div>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme={theme == 'dark'? 'vs-dark' : 'vs'}
        defaultValue="console.log('Hello, monaco!')"
        value={fileContent ?? ''}
        onChange={handleEditorChange}
        // options={{
        //   selectOnLineNumbers: true,
        //   minimap: { enabled: false },
        //   automaticLayout: true,
        // }}
      />
    </div>
  );
};

export default CodeEditor;
