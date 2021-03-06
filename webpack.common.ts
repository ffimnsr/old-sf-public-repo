import webpack from "webpack";
import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
    entry: {
        sesame: [
            path.resolve(__dirname, "src/index.ts")
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
                styles: {
                    test: /\.css$/,
                    name: "styles",
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, "src"),
                use: "ts-loader"
            },
            {
                test: /\.s[ac]ss$/,
                include: path.resolve(__dirname, "styles"),
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function() {
                                return [
                                    require("autoprefixer")
                                ];
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: path.resolve(__dirname, "images"),
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/",
                            publicPath: "images/"
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                            publicPath: "fonts/"
                        }
                    }
                ]
            },
            {
                test: require.resolve("jquery-slimscroll"),
                use: [
                    {
                        loader: "imports-loader?this=>window,jQuery=jquery,$=jquery"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".scss"],
        alias: {
            styles: path.resolve(__dirname, "styles"),
            images: path.resolve(__dirname, "images"),
            modules: path.resolve(__dirname, "node_modules"),
            components: path.resolve(__dirname, "src/components"),
            widgets: path.resolve(__dirname, "src/widgets"),
            configs: path.resolve(__dirname, "src/configs")
        }
    },
    output: {
        filename: "[name].[hash].bundle.js",
        chunkFilename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: ""
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].bundle.css"
        }),
        new HtmlWebpackPlugin({
            title: "SmartFunding",
            favicon: "images/favicon.png",
            template: "templates/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: ["popper.js", "default"],

        }),
        new webpack.BannerPlugin("SmartFunding")
    ]
};

export default config;
