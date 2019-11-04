const path  =  require('path')
const merge  =  require('webpack-merge')
const baseConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const prodConfig  = {
    mode: 'production',
    devtool:'#source-map',
    entry:{
        'index':path.join(__dirname,'../index.js')
    },
    output:{
        path:path.join(__dirname,'../lib/'),
        filename:'index.js',
        libraryTarget:'umd',
		umdNamedDefine:true,
        // library:'SkeletonPlugin',
        libraryExport: "default"
    },
    module:{
        rules:[
            {
                test: /\.(css|scss)$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('autoprefixer')(), //CSS浏览器兼容
                            ],
                        },
                    }, 
                    { loader: require.resolve('sass-loader') }
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin({
            dry:false,
            cleanStaleWebpackAssets:true,
            cleanOnceBeforeBuildPatterns:[
                path.resolve(__dirname,'../lib/')
            ]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename:'[name].[hash].css',
            // chunkFilename: '[id].[hash].css',
            filename:"main.min.css"
        }),
        
    ],
    externals: {
        react: 'react',
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    },
    optimization:{
        minimizer:[new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
              styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true,
              },
            }
        },
    }
}
module.exports =  merge(prodConfig,baseConfig)