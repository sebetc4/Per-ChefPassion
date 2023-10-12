
// https://github.com/AdrienNguyen/express-typescript-webpack

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                },
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    externals: [nodeExternals({
        allowlist: ['classes', 'schemas', 'types', 'functions']
    })],
    plugins: [
        new webpack.ProgressPlugin({
            modulesCount: 5000,
        }),
    ],
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        ascii_only: true,
                    },
                },
            }),
        ],
    },
};
