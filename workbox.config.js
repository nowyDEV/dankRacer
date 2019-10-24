/* eslint-disable */
module.exports = options => {
  options.ignoreUrlParametersMatching = [/./]
  options.exclude = [/\.map$/, /asset-manifest\.json$/, /\.(ttf|eot|svg|woff)$/]
  options.runtimeCaching = [
    {
      // Match any same-origin request that contains 'api'.
      urlPattern: /api/,
      // Apply a network-first strategy.
      handler: 'NetworkFirst'
    },
    {
      urlPattern: /media/,
      handler: 'CacheFirst'
    }
  ]
  return options
}
