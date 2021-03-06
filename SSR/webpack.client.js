const path = require("path");
const { merge } = require('webpack-merge');
const baseConfig = require("./webpack.base.js");

const config = {
  target: "web",
  node: {
    fs: "empty",
    net: "empty",
  },
  // Tell webpack the root file of our
  // server application
  entry: "./src/client/client.tsx",

  // Tell webpack where to put the output file
  // that is generated

  output: {
    filename: "clientBundle.js",
    path: path.resolve(__dirname, "public"),
  },
};

module.exports = merge(baseConfig, config);
