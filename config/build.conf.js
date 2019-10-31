const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./base.conf')

const resolve = dir => path.join(__dirname, './', dir)
module.exports =  merge(baseConfig,{
	mode:"production",
	devtool:'#source-map',
	resolve:{
		extensions:['.js','.tsx','.ts','.json'],
		alias:{
			'skeleton':''
		},
		modules: [
	      resolve('../src'),
	      resolve('../node_modules')
	    ],
	}
})