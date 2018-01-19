const nodemon = require('nodemon')
const once = require('ramda').once
const path = require('path')

module.exports = function (config, webpack) {
  const nodeModules = config.paths.patterns.map(p => path.join(p, 'node_modules'))
  config.webpack.resolve.modules.push(...nodeModules)
  config.webpack.resolveLoader.modules.push(...nodeModules)

  const startServerOnce = once((err, stats) => {
    if (err) return
    // console.log(stats.toString({
    //   chunks: false,
    //   colors: true
    // }))
    const assets = Object.keys(stats.compilation.assets).filter(asset => asset.match(/.js$/))
    const serverPaths = assets.map(asset => path.join(compiler.options.output.path, asset))
    nodemon({
      script: serverPaths[0],
      watch: serverPaths,
      nodeArgs: process.argv.slice(2)
    }).on('quit', process.exit)
  })

  const compiler = webpack(config.webpack)
  compiler.watch(config.watchOptions || {}, startServerOnce)
}
