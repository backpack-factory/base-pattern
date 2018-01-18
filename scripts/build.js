module.exports = function (config, webpack) {
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
