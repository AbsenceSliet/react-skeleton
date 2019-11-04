const path  = require('path')
module.exports = {
    resolve:{
        extensions:['.js','.ts','.tsx','.json'],
        alias:{
            "@component": path.join(__dirname,'../src/component/')
        },
        modules: ["node_modules"]
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('babel-loader'),
                options: {
                    compact: true,
                },
                exclude:/node_modules/
            },
            {
                test: /\.tsx?$/,
                use:['ts-loader'],
                exclude: /node_modules/
            }
        ]
    }
}