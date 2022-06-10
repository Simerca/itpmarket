const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  configureWebpack:{
    resolve: {
      fallback: {
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          buffer: require.resolve("buffer"),
      },
  }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  }
})
