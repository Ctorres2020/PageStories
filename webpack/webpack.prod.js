const common = require('./webpack.common');
const {merge} = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'dist/css/[name].[contenthash].css'
})

module.exports = merge(common,{
    output: {
        publicPath: '.'
    },
    module:{
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use:[
                        {loader: 'css-loader'},
                        {loader: 'sass-loader'}
                    ]
                })
            },
            {
                test: /\.html$/,
                use:[
                    {loader: 'html-loader'}
                ]
            }
        ]
    },
    plugins: [extractSass]
});