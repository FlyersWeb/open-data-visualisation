const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: { app: './src/index.js' },
    plugins: [
        new HtmlWebpackPlugin({
            title: "ISF France",
            template: 'src/index.html',
            meta: {
                charset: 'UTF-8'
            }
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './'
    },
    output: {
        filename: '[name].main.js',
        path: path.resolve(__dirname),
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
