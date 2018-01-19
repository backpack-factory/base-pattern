const path = require('path')

module.exports = function (config, webpack) {
  const nodeModules = config.paths.patterns.map(p => path.join(p, 'node_modules'))
  config.webpack.resolve.modules.push(...nodeModules)
  config.webpack.resolveLoader.modules.push(...nodeModules)

  const compiler = webpack(config.webpack)
  compiler.run((error, stats) => {
    console.log(stats.toString({
      chunks: false,
      colors: true
    }))
    if (error || stats.hasErrors()) {
      process.exitCode = 1
    }
  })
}
