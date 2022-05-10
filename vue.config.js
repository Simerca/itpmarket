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
  }
})
