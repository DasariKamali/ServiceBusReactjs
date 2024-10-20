// // webpack.config.js

// const webpack = require('webpack');
// const path = require('path');

// module.exports = {
//     mode: 'development',
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js',
//         publicPath: '/',
//     },
//     devtool: 'source-map',
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-react'],
//                     },
//                 },
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.ts', '.js'],
//         fallback: {
//             stream: require.resolve('stream-browserify'),
//             buffer: require.resolve('buffer'),
//             process: require.resolve('process/browser'),
//             assert: require.resolve('assert'),
//             crypto: require.resolve('crypto-browserify'),
//             http: require.resolve('stream-http'),
//             https: require.resolve('https-browserify'),
//             os: require.resolve('os-browserify/browser'),
//         },
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             Buffer: ['buffer', 'Buffer'],
//             process: 'process/browser',
//         }),
//         new webpack.DefinePlugin({
            // 'process.env.REACT_APP_QUEUE_CONNECTION_STR': JSON.stringify(process.env.REACT_APP_QUEUE_CONNECTION_STR),
            // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
//         }),
//     ],
//     devServer: {
//         static: './dist',
//         historyApiFallback: true,
//     },
//     target: 'web',
// };















const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mode: 'development',
    entry: './src/main.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),
            process: require.resolve('process/browser'),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'import.meta.env.VITE_SERVICE_BUS_CONNECTION_STRING': JSON.stringify(process.env.VITE_SERVICE_BUS_CONNECTION_STRING),
            'import.meta.env.VITE_QUEUE_NAME': JSON.stringify(process.env.VITE_QUEUE_NAME),
            'import.meta.env.VITE_TIMEOUT_IN_MS': JSON.stringify(process.env.VITE_TIMEOUT_IN_MS),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    devServer: {
        static: './dist',
        historyApiFallback: true,
    },
    target: 'web',
};
