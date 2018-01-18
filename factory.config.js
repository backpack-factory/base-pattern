const path = require('path')
const webpack = require('webpack')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  target: 'node',
  webpack: {
    entry: './src/main.js',
    output: {
      filename: '[name].js',
      sourceMapFilename: '[name].map'
    },
    module: {
      rules: [{
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: [require('babel-preset-stage-3')]
        }
      }]
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: []
    },
    resolveLoader: {
      modules: []
    },
    devtool: 'source-map',
    performance: { hints: false },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin()
    ]
  },
  updateConfig (config) {
    config.webpack.output.path = path.resolve('build')
    config.webpack.plugins.unshift(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(config.env),
        '__DEV__': config.env === 'development'
      }),
      new FriendlyErrorsWebpackPlugin({ clearConsole: config.env === 'development' })
    )
    return config
  },
  scripts: {
    dev: require('./scripts/dev'),
    build: require('./scripts/build')
  }
}
