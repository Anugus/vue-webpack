const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const vueLoaderOption = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const config = {
  mode: process.env.NODE_ENV || 'production', // development || production
  target: 'web',
  //js入口
  entry: path.join(__dirname,'../src/index.js'),
  output: {
      //打包输出命名
      filename: 'bundle.[hash:8].js',
      //打包输出位置
      path: path.join(__dirname,'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  //配置打包文件类型
  module: {
      rules: [
          {
              test: /\.(vue|js)$/,
              loader: 'eslint-loader',
              exclude: '/node_modules',
              enforce: 'pre'
          },
          {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: vueLoaderOption(isDev)
          },
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: '/node_modules'
          },
          {
              test: /\.(gif|jpg|jpeg|png|svg)$/,
              use: [
                  {
                      loader:'url-loader',
                      options: {
                          limit: 1024,
                          name: 'resources/[path][name].[ext]'
                      }
                  }
              ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
              'file-loader'
            ]
          }
      ]
  },
  plugins:[
      //vue-loader
      new VueLoaderPlugin()
      ]
}


module.exports = config
