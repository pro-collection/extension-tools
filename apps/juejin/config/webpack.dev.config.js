const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/background/index.js",
  output: {
    filename: "background/name.js",
    path: path.resolve(__dirname, "../dist"),
  },
};
