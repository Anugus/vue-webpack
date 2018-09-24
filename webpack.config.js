const path = require('path');
const {VueLoaderPlugin} = require('vue-loader'); 
const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    //js文件入口
    entry: path.join(__dirname,'src/index.js'),
    output: {
        //打包输出命名
        filename: 'bundle.[hash:8].js',
        //打包输出位置
        path: path.join(__dirname,'dist')
    },
    //配置打包文件类型
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        //vue-loader
        new VueLoaderPlugin(),
        //html入口
        new HTMLplugin(),
        //环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"prodution"'
            }
        })
        ]
}

if(isDev) {//dev测试环境
    //打包css
    config.module.rules.push(
        {
            test: /\.less$/,
            use: [
                'style-loader',
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
    )
    config.devtool = '#cheap-module-eval-source-map',
    //dev-server配置
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true 
        },
        hot: true //热更新
    }
    //热更新配置
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else {//生产环境配置
    config.entry = {
        //业务js文件入口
        app:path.join(__dirname,'src/index.js'),
        //框架JS入口
        vendor: ['vue']
    }
    //命名打包后出的JS
    config.output.filename = '[name].[chunkhash:8].js'
    //打包css
    config.module.rules.push(
        {
            test: /\.less$/,
            use:ExtractPlugin.extract({
                fallback: 'style-loader',
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
    )
    config.plugins.push(
        //单独打包css
        new ExtractPlugin('style.[contentHash:8].css'),
         //单独打包框架代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        //单独打包webpack模块代码
        new webpack.optimize.CommonsChunkPlugin({ 
            name: 'runtime'
        })
    )
}

module.exports = config