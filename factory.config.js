const path = require('path')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  webpack: {
    target: 'node',
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
    plugins: []
  },
  updateConfig (config, webpack) {
    config.webpack.output.path = path.resolve('build')
    config.webpack.plugins.unshift(
      new webpack.NoEmitOnErrorsPlugin(),
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
