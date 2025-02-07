import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/common.scss"; // 全局css
import './styles/theme.scss'; // 主题样式css
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);