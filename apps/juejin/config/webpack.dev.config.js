const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    ["background/index"]: "./src/background/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: path.resolve(__dirname, "../dist") },
        { from: path.resolve(__dirname, "../src/images"), to: path.resolve(__dirname, "../dist/images") },
      ],
    }),
  ],
};
