const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      taskpane: './src/taskpane.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      clean: true
    },
    devtool: isProduction ? false : 'inline-source-map',
    devServer: {
      static: './dist',
      port: 3000,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      server: 'https'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/taskpane.html',
        filename: 'taskpane.html',
        chunks: ['taskpane']
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '.'
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
};
