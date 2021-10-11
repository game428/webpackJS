var path = require("path");
var webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production", // production
  entry: "./src/sdkInit.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "MSIM.js",
    library: "msim", // 指定的就是你使用require时的模块名
    libraryExport: "default", // 增加这个属性
    libraryTarget: "umd", // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // 清除dist文件夹
    new CleanWebpackPlugin(),
  ],
  performance: {
    hints: "warning", // 枚举 false关闭
    maxEntrypointSize: 100000000, // 最大入口文件大小
    maxAssetSize: 100000000, // 最大资源文件大小
    assetFilter: function (assetFilename) {
      //只给出js文件的性能提示
      return assetFilename.endsWith(".js");
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          // 删除注释
          output: {
            comments: false,
          },
          // 删除console debugger 删除警告
          compress: {
            drop_console: true, //console
            drop_debugger: false,
            pure_funcs: ["console.log"], //移除console
          },
        },
      }),
      new TerserPlugin({
        extractComments: false, //不将注释提取到单独的文件中
      }),
    ],
  },
};
