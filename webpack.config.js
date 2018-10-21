const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清除文件插件
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/pages/index/index.js',
    about: './src/pages/about/about.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name][hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.css$/,
        // 从右向左依次执行
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: path.resolve(__dirname, 'dist'), //最好设置成绝对路径
    // 设置服务器的ip地址,可以是localhost
    host: 'localhost',
    // 设置端口
    port: 1234,
    // 设置自动打开浏览器
    open: true,
    // 设置自动更新
    hot: true
  },
  plugins: [
    // 多页面时需要写多个new HtmlWebpackPlugin
    new HtmlWebPackPlugin({
      template: './src/pages/index/index.html',  // 会与根目录下的index.html相关联，把根目录下index的东西都放到生成的HTML中
      filename: 'index.html', // 生成的HTML名，路径为上面output中的path，不写默认为index.html
      // title: '首页',
      hash: true,
      //inject: 'body', //指定链接注入在<head>标签中还是<body>标签中，为false值时表示不自动注入文件中，需要手动设置
      chunks: ['index'],  // 多页面分别引入自己的js
      minify: {
        collapseWhitespace: false //折叠空白区域 也就是压缩代码
      }
    }),
    new HtmlWebPackPlugin({
      template: './src/pages/about/about.html',  // 会与根目录下的index.html相关联，把根目录下index的东西都放到生成的HTML中
      filename: 'about.html', // 生成的HTML名，路径为上面output中的path，不写默认为index.html
      // title: '关于我',
      hash: true,
      //inject: 'body', //指定链接注入在<head>标签中还是<body>标签中，为false值时表示不自动注入文件中，需要手动设置
      chunks: ['about'],  // 多页面分别引入自己的js
      minify: {
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: '[name][contenthash].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),//实例化，参数为目录
    new webpack.ProvidePlugin({
      $: 'jquery',// 全局变量
      jQuery: 'jquery'
    })
  ]
};
