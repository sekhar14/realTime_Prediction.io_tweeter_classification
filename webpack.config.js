const path = require('path')
const webpack = require('webpack')


module.exports = {
    entry : path.join(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname,'./public'),
        filename: '[name].bundle.js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-class-properties']
                }
            }
        ]
    }
}