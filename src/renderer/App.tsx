import React, { useState, useEffect } from "react";
import "./styles/CustomTitleBar.scss"; // 引入 SCSS 文件
import "./styles/App.scss"; // 引入 SCSS 文件
import CustomTitleBar from "./components/CustomTitleBar"; // 引入自定义标题栏
import AppContainer from "./App-container";
import { ConfigProvider, theme } from 'antd';
import { loadData } from "./utils/stateUtils";

const App: React.FC = () => {
  const [themName, setTheme] = useState<string | null>(null); // 选中的文件
  useEffect(() => {
    async function getSettings() {
      let currentTheme = await loadData('get-theme')
      if (currentTheme){
        setTheme(currentTheme)
      }
    }
    getSettings()
  }, []);
  return (
    <ConfigProvider
      theme={{
      // 1. 单独使用暗色算法
        algorithm: themName == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
    <div className="app-main">
      <CustomTitleBar updateTheme={setTheme}/> {/* 自定义标题栏 */}
      <AppContainer/>
    </div>
    </ConfigProvider>
  );
};

export default App;
