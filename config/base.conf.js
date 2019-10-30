const path =require('path')
const webpack =  require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const resolve = dir => path.join(__dirname, '.', dir)
const pathSrc = resolve('../src/')
const tsConfig = resolve('../tsconfig.json')
module.exports = {
	entry:[resolve('./polyfills'),resolve('../index.js')],
	output:{
		path:path.resolve(__dirname,'../dist'),
		filename:'[name].js',
		publicPath:'/',
		libraryTarget:'umd',
		udNameDefine:true,
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
				oneOf:[
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
                        test: /\.(ts|tsx)$/,
                        include: paths.appSrc,
                        use: [
                            {
                                loader: require.resolve('ts-loader'),
                                options: {
                                    // disable type checker - we will use it in fork plugin
                                    transpileOnly: true,
                                    configFile: tsConfig,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(css|scss)$/,
                        loader: ExtractTextPlugin.extract(
                            Object.assign(
                                {
                                    fallback: {
                                        loader: require.resolve('style-loader'),
                                        options: {
                                            hmr: false,
                                        },
                                    },
                                    use: [
                                        {
                                            loader: require.resolve('css-loader'),
                                            options: {
                                                importLoaders: 1,
                                                minimize: true,
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
                                                    autoprefixer({
                                                        browsers: [
                                                            '>1%',
                                                            'last 4 versions',
                                                            'Firefox ESR',
                                                            'not ie < 9', // React doesn't support IE8 anyway
                                                        ],
                                                        flexbox: 'no-2009',
                                                    }),
                                                ],
                                            },
                                        },
                                        { loader: require.resolve('sass-loader') }
                                    ],
                                },
                            )
                        ),
                    },
                    {
                        loader: require.resolve('file-loader'),
                        // Exclude `js` files to keep "css" loader working as it injects
                        // it's runtime that would otherwise processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
				]
			}
		]
	}
}