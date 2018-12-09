const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: { app: './src/index.js' },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Assiduité Ile-de-France",
            template: 'src/index.html',
            meta: {
                charset: 'UTF-8'
            }
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: '[name].main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            },
            {
                test: /\.(csv|tsv)$/,
                loader: 'csv-loader',
                options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            },
        ]
    }
};
