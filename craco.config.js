/* eslint-disable */
const emotionPresetOptions = {}
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(undefined, emotionPresetOptions)
const path = require('path')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  eslint: {
    mode: require('@craco/craco').ESLINT_MODES.file
  },
  babel: {
    plugins: [...emotionBabelPreset.plugins]
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'production') {
        try {
          webpackConfig.plugins = webpackConfig.plugins.map(plugin => {
            if (plugin.constructor.name === 'GenerateSW') {
              return new WorkboxWebpackPlugin.InjectManifest({
                swSrc: './src/sw.js',
                swDest: 'service-worker.js'
              })
            }

            return plugin
          })
        } catch (error) {
          console.log('\x1b[31m%s\x1b[0m', `[craco-workbox]`)
          console.log('\x1b[31m%s\x1b[0m', error.stack)
          process.exit(1)
        }
      }

      return webpackConfig
    }
  }
}
