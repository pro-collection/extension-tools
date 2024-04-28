const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    ["background/index"]: "./src/background/index.ts",
    ["scripts/index"]: "./src/scripts/index.ts",
    ["popup/index"]: "./src/popup/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                // {
                //   targets: "iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead", // 根据项目去配置
                //   useBuiltIns: "usage", // 会根据配置的目标环境找出需要的polyfill进行部分引入
                //   // corejs: 3, // 使用 core-js@3 版本
                // },
              ],
              ["@babel/preset-typescript"],
              ["@babel/preset-react"],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
    mainFiles: ["main", "index"], // 添加'main'作为一个默认解析的文件名
    alias: {
      "@src": path.resolve(__dirname, "../src/"),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: path.resolve(__dirname, "../dist") },
        { from: path.resolve(__dirname, "../src/images"), to: path.resolve(__dirname, "../dist/images") },
        { from: path.resolve(__dirname, "../src/style"), to: path.resolve(__dirname, "../dist/style") },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/popup/index.html"), // 使用自定义模板
      filename: "popup/index.html",
      chunks: ["popup/index"],
    }),
  ],
  output: {
    clean: true, // 在生成文件之前清空 output 目录
  },
};
