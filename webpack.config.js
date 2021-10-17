const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './components/script',
  output: {
    filename: './build.js'
  },
  module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },
        ],

    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new VueLoaderPlugin()
    ],
}
