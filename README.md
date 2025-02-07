# 策略回测工具

## 项目简介

本项目旨在实现一个本地化的 JavaScript 策略编写和回测工具。用户可以通过编写 JavaScript 代码来定义交易策略，并利用历史行情数据对策略进行回测。目前，项目已完成本地 JavaScript 文件的编辑和保存功能。

## 使用的主要模块

- [electron](https://www.electronjs.org/)：用于构建跨平台的桌面应用。
- [vscode](https://code.visualstudio.com/)：用于提供代码编辑功能。
- [node.js](https://nodejs.org/)：用于运行 JavaScript 代码。
- [typeScript](https://www.typescriptlang.org/)：用于提供类型检查和代码提示。
- [react](https://reactjs.org/)：用于构建用户界面。
- [webpack](https://webpack.js.org/)：用于打包和构建项目。
- [monaco-editor](https://microsoft.github.io/monaco-editor/)：用于提供代码编辑器。
- [antd](https://ant.design/)：用于提供 UI 组件库。
---

## 功能描述

### 已实现功能
1. **本地 JavaScript 文件编辑**：
   - 支持打开本地 `.js` 文件进行编辑。
   - 支持保存编辑后的代码到本地文件。

### 预期功能
1. **策略回测引擎**：
   - 支持加载历史行情数据。
   - 提供回测框架，允许用户编写的策略在历史数据上运行。
   - 输出回测结果，包括收益率、最大回撤、胜率等指标。

2. **策略编写支持**：
   - 提供策略编写模板和 API 文档。
   - 支持常用技术指标（如 MA、MACD、RSI 等）的计算。

3. **可视化回测结果**：
   - 生成回测结果的图表（如资金曲线、买卖点标记等）。

---

## 使用方法

### 环境要求
- Node.js (建议版本 16.x 或以上)
- 一个现代浏览器（如 Chrome、Firefox）

### 安装与运行
1. 克隆本项目到本地：
   ```bash
   git clone https://github.com/shiki2014/Patience-ai.git
   ```

2. 进入项目目录：
   ```bash
   cd Patience-ai
   ```

3. 安装依赖：
   ```bash
   npm install
   ```

4. 启动应用：
   ```bash
   npm e-start
   ```

---

## 贡献指南

欢迎对本项目进行贡献！如果您有任何改进意见或功能请求，请提交 Issue 或 Pull Request。
