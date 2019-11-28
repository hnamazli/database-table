const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname,"./src/index.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./build")
    },
    devServer: {
        port: 2019,
        contentBase: path.resolve(__dirname, "./build"),
        hot: true,
        open: true,
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        writeToDisk: filePath => {
            return /(index.html$)|(bundle.js$)|(style.css$)/.test(filePath)
        }
    },
    module: {
        rules: [
            {test: /\.html$/, use: "html-loader"},
            /* { test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                options: {
                    preset: ['@babel/preset-evn'],
                    plugins : ['@babel/plugin-proposal-class-properties'],
                    }
                }
            }, */
            {test: /\.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html"
        }),
    ]

}