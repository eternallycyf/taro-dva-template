module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    minProgramBaseUrl: '"http://127.0.0.1:9527"'
  },
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
    devServer: {
      // 设置代理来解决 H5 请求的跨域问题
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:9527',
          changeOrigin: true
        },
      }
    }
  }
}
