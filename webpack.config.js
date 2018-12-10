const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            title: "Open Data visualisation",
            meta: {
                charset: 'UTF-8'
            }
        })
    ],
    devServer: {
        contentBase: './'
    },
    output: {
        filename: 'main.js',
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
              test: /\.md$/,
              use: [
                  {
                      loader: "html-loader"
                  },
                  {
                      loader: "markdown-loader"
                  }
              ]
          },
        ]
    }
};

