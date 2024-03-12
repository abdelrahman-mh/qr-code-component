const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode
  const isDevelopment = mode === 'development'

  return {
    mode,
    entry: './src/main.js',
    output: {
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDevelopment ? 'inline-source-map' : false,
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext][query]',
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
    ],
  }
}
