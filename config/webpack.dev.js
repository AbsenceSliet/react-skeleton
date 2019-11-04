const path  = require('path')
const merge = require('webpack-merge')
const baseConfig  =  require('./webpack.base')
const HtmlWebpackPlugin  =  require('html-webpack-plugin')
const devConfig  =  {
    mode: 'development',
    devtool: 'inline-source-map',
    entry:path.join(__dirname,'../example/index.tsx'),
    output:{
        path: path.join(__dirname,'../example'),
        filename:'bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader:require.resolve('style-loader')
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: require.resolve('sass-loader')
                    }
                ]
            }
        ]
    },
    devServer:{
        contentBase: path.join(__dirname,'../example/'),
        compress: true,
        port: 9000,
        open:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Compoent Example',
            template:path.join(__dirname,'../public/index.html'),
            favicon:'../public/react-awesome-skeleton.ico'
        })
    ]

}
module.exports = merge(devConfig,baseConfig)