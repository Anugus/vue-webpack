const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

let config

const defaultPlugins = [
    //html入口
    new HTMLplugin(),
    //环境变量
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"prodution"'
        }
    })
]

const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    hot: true //热更新
}

if(isDev) {//dev测试环境
    config =merge(baseConfig,{
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules:[
                {
                    test: /\.less$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'less-loader'
                    ]
                },
                {
                  test: /\.css$/, // 针对CSS结尾的文件设置LOADER
                  use: [{
                      loader: "style-loader/url"
                    },
                    {
                      loader: "file-loader"
                    }
                  ]
                }
            ]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ])
    })
}else {//生产环境配置
    config = merge(baseConfig,{
        entry: {
             //业务js文件入口
            app:path.join(__dirname,'../src/index.js')
        },
        output:{
            filename: '[name].[chunkhash:8].js',
            path: path.join(__dirname,'../dist')
        },
        module:{
            rules:[
                {
                    test: /\.less$/,
                    use:ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use:  [
                            'css-loader',
                            {//增加CSS前缀
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'less-loader'
                        ]
                    })
                },
                {
                  test: /\.css$/, // 针对CSS结尾的文件设置LOADER
                  use: [{
                      loader: "style-loader/url"
                    },
                    {
                      loader: "file-loader"
                    }
                  ]
                }
            ]
        },
        optimization: {
          splitChunks: {
            chunks: 'all'
          },
          runtimeChunk: true
        },
        plugins: defaultPlugins.concat([
            //单独打包css
            new ExtractPlugin('style.[hash:8].css'),
        ])
    })
}

module.exports = config
