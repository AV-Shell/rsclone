const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env = {}) => {
  console.log(env);
  const { mode = 'development' } = env;
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ]
  };

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Magic Button',
        // buildTime: new Date().toLocaleString(),
        template: 'public/index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/favicon.ico'),
            to: path.resolve(__dirname, 'build/favicon.ico'),
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
    ];
    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css',
        })
      );
    }
    return plugins;
  }

  return {
    target: 'web',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle-[hash].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    mode: isProd ? 'production' : isDev && 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:10].[ext]',
              }
            },
          ],
        },
        {
          test: /\.(ico|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'icons',
                name: '[name]-[sha1:hash:10].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), 'sass-loader',],
        },
      ],
    },
    plugins: getPlugins(),

    devServer: {
      open: true,
      hot: true,
      inline: true,
      liveReload: true,
      overlay: true,
      host: "localhost",
      port: 8086,
      contentBase: 'build',
      watchOptions: {
        poll: true
      }
    },
  }
};