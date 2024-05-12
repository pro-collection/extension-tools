const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { compact } = require("lodash");

const env = process.env.NODE_ENV;

module.exports = {
  mode: env || "development",
  devtool: false,
  entry: {
    ["background/index"]: "./src/background/index.ts",
    ["popup/index"]: "./src/popup/index.tsx",

    ["pages/imgStatic/index"]: "./src/pages/imgStatic/index.tsx",

    // 内容脚本
    // 动态注入 内容脚本， 不需要静态注入， 没有意义。
    // ["contents/index"]: "./src/contents/index.ts",
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
                //   corejs: 3, // 使用 core-js@3 版本
                // },
              ],
              ["@babel/preset-typescript"],
              ["@babel/preset-react"],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 使用 MiniCssExtractPlugin.loader 代替 style-loader
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-preset-env")({
                    // Configurations for postcss-preset-env
                    stage: 3,
                    features: {
                      "nesting-rules": true,
                    },
                  }),
                  require("tailwindcss"),
                ],
              },
            },
          },
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|webp)$/i,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 2000,
      //         // //限制打包图片的大小：
      //         // //如果大于或等于2000Byte，则按照相应的文件名和路径打包图片；如果小于2000Byte，则将图片转成base64格式的字符串。
      //         // name: 'img/[name].[hash:8].[ext]',
      //         // //img:图片打包的文件夹；
      //         // //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
      //         // //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: "assets/imgs/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: "assets/fonts/[name].[hash:8][ext]",
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
  plugins: compact([
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: path.resolve(__dirname, "../dist") },
        { from: path.resolve(__dirname, "../src/icons"), to: path.resolve(__dirname, "../dist/icons") },
        { from: path.resolve(__dirname, "../src/style"), to: path.resolve(__dirname, "../dist/style") },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/popup/index.html"), // 使用自定义模板
      filename: "popup/index.html",
      chunks: ["popup/index"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/pages/imgStatic/index.html"), // 使用自定义模板
      filename: "pages/imgStatic/index.html",
      chunks: ["pages/imgStatic/index"],
    }),
    new MiniCssExtractPlugin({
      filename: "style/[hash:8].css", // 将css单独提测出来放在assets/css 下
    }),
    env === "production" &&
      new FileManagerPlugin({
        // 注意！记得这里需要加一层events节点，否则会报错噢，宝
        events: {
          onEnd: {
            delete: ["./dist.zip"],
            archive: [
              {
                source: "./dist",
                destination: "./dist.zip",
              },
            ],
          },
        },
      }),
  ]),
  output: {
    clean: true, // 在生成文件之前清空 output 目录
  },
};
