const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

const config = ['FIREBASE_PROJECT_ID', 'FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN'].reduce(
  (whole, key) => ({ ...whole, [key]: process.env[key] }),
  {}
);

module.exports = {
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.json', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Whitfield',
      template: './src/index.html',
      hash: true,
      config,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
  },
};
