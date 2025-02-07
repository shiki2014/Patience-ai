const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  mode: 'development',  // 或 'production'
  entry: {
    main: path.resolve(__dirname, 'src/main/main.ts'),  // 主进程入口
    preload: path.resolve(__dirname, 'src/main/preload.ts'),  // 预加载脚本入口
  },
  target: 'electron-main',  // 目标为 Electron 主进程
  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出到 dist 文件夹
    filename: '[name].js',  // [name] 会对应 entry 中的键名（main 和 preload）
  },
  resolve: {
    extensions: ['.ts', '.js'],  // 支持解析 .ts 和 .js 文件
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  // 处理所有 TypeScript 文件
        exclude: /node_modules/,
        use: 'ts-loader',  // 使用 ts-loader 编译 TypeScript 文件
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin()
  ],
  cache: false,
  watch: true,  // 启用文件监听，实时编译
  devtool: 'source-map',  // 使用 source-map 调试支持
};
