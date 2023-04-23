// Documentation of this configuration is in src/documentation/infrastructure/webpack.story.mdx. Keep in sync.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isDevelopment = process.env.NODE_ENV === "development";

const extensions = [".ts", ".tsx", ".js"];

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        assetModuleFilename: "assets/[hash][ext][query]",
        publicPath: "/", // allow persist history of react-router over refresh
    },
    module: {
        rules: [
            {
                test: /\.ya?ml$/,
                use: "yaml-loader",
            },
            // TypeScript files
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            // Asset files (images, fonts)
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
                include: path.resolve(__dirname, "src"),
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    resolve: {
        extensions,
        plugins: [
            new TsconfigPathsPlugin({
                extensions,
            }),
        ],
    },
    optimization: {
        runtimeChunk: "single",
        moduleIds: "deterministic",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    devServer: {
        port: 3000,
        historyApiFallback: true, // allow persist history of react-router over refresh
    },
};
