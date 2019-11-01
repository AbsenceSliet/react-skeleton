const path =require('path')
const webpack =  require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = dir => path.join(__dirname, '.', dir)
const pathSrc = resolve('../src/')
const polyfills =  resolve('./polyfill.js')
const tsConfig = resolve('../tsconfig.json')
const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    // entry:[polyfills,{'skeleton':resolve('../index')}],
    entry:{'':resolve('../index')},
	output:{
		path:path.resolve(__dirname,'../','dist'),
		filename:'[name].js',
		publicPath:'/',
		libraryTarget:'umd',
		umdNamedDefine:true,
		library:'SkeletonPlugin'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				loader:require.resolve('source-map-loader'),
				enforce:'pre',
				include:pathSrc
			},
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(js|jsx|mjs)$/,
                include: pathSrc,
                loader: require.resolve('babel-loader'),
                options: {
                    compact: true,
                },
            },
            {
                test: /\.tsx?$/,
                include: pathSrc,
                exclude:[
                    path.resolve(__dirname,"node_modules")
                ],
                use: [
                    'ts-loader'
                ],
            },
			{
                test: /\.(css|scss)$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: process.env.NODE_ENV === 'development',
                        },
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
                                require('postcss-flexbugs-fixes')
                            ],
                        },
                    },
                    { loader: require.resolve('sass-loader') }
                ]
            },
            // {
            //     loader: require.resolve('file-loader'),
            //     // Exclude `js` files to keep "css" loader working as it injects
            //     // it's runtime that would otherwise processed through "file" loader.
            //     // Also exclude `html` and `json` extensions so they get processed
            //     // by webpacks internal loaders.
            //     exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            //     options: {
            //         name: 'static/media/[name].[hash:8].[ext]',
            //     },
            // },
		]
	},
    plugins:[
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new CleanWebpackPlugin({
            dry:false,
            cleanStaleWebpackAssets:true,
            cleanOnceBeforeBuildPatterns:[
                path.resolve(__dirname,'../','dist')
            ]
        })
    ]
}