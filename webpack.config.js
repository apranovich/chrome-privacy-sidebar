const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        contentscript: './src/content-scripts/index.js',
        background: './src/background.js'
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { 
                test: /\.css$/,
                use: "css-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {
                from: 'src/content-scripts/styles/app.css',
                to: 'contentscript.css'
            },
            {
                from: 'manifest.json',
                to: 'manifest.json'
            }
        ])
    ]    
};