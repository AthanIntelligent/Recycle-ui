let proxyObj = {};
proxyObj['/'] = {
  target: 'http://localhost:8082',
  ws: false,
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}
module.exports = {
  devServer: {
    host:"localhost",
    port:8082,
    proxy: proxyObj
  }
}
