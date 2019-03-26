const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (env) => {
  const DISTRIBUTION = env && env.DISTRIBUTION === 'true';

  const plugins = [
    new HtmlWebpackPlugin({
      inlineSource: '.(js)$',
      template: 'src/index.html'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src/styles',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
    }),
    new webpack.DefinePlugin({
      DISTRIBUTION,
    })
  ];

  return {
    mode: DISTRIBUTION ? 'production' : 'development',
    resolve: {
      extensions: ['.ts', '.tsx', '.js' , '.scss', '.png'],
    },
    entry: ['./src/index'],
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
    },
    devServer: {
      // contentBase: path.join(__dirname, 'build'),
      port: 9001,
      compress: false,
      https: false,
      open: false,
      historyApiFallback: true
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          enforce: 'pre',
          loader: "tslint-loader",
          exclude: [/node_modules/, /styles/],
        },
        {
          test: /\.ts(x?)$/,
          exclude: [/node_modules/, /styles/],
          use: 'ts-loader',
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader','sass-loader'],
        },
        {
          test: /\.svg$/,
          use: {
            loader: 'svg-url-loader',
            options: {
              noquotes: false,
              limit: 1000000000
            }
          }
        },
        {
          test: /\.(jpe?g|png|woff|woff2|ttf|wav)$/,
          use: 'url-loader',
        },
      ],
    },
  };
};
