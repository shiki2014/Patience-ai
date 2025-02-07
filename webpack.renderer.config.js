const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/renderer/index.tsx', // 渲染进程入口文件
  target: 'electron-renderer',                     // Electron 渲染进程目标
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/bundle.js',    // 输出到 /assets 目录
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.sass', '.less']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // 将 CSS 插入到 DOM 中
          {
            loader: 'css-loader', // 解析 CSS 文件
            options: {
              modules: { // 模块化 CSS（可选）
                auto: (resourcePath) => resourcePath.endsWith('.module.css'), // 只有以 .module.css 结尾的文件才使用 CSS Modules
              },
            },
          }
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html', // 使用模板文件
      filename: 'index.html',               // 输出文件到 dist/
    }),
    new MonacoWebpackPlugin()
  ],
  cache: false,
  watch: true,
  devtool: 'source-map'  // 使用 source-map 调试支持
};
