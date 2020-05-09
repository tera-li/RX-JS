const htmlwebpackplugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // entry: __dirname + '/src/index.js',  // src/js   入口文件
    entry: __dirname + '/src_ts/index.ts', // src_ts/ts   入口文件
    output: {
        path: __dirname + '/dist', // 出口文件
        filename: 'index.js'
    },
    plugins: [
        new htmlwebpackplugin({
            // template: __dirname + '/src/index.html' // 运行入口src/index.html文件
            template: __dirname + '/src_ts/index.html' // 运行入口src_tsindex.html文件
        })
    ],
    module: {
        rules: [{
                test: /\.js$/, // 解析js文件
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.tsx?$/, // 解析ts文件
                use: {
                    loader: 'ts-loader'
                }

            },
        ]
    },
    devtool: 'source-map' // js文件编译
}