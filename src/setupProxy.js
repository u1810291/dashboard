const proxy = require('http-proxy-middleware');

console.log('develop proxy started')

module.exports = function(app) {
  // common api requests
  app.use(`${process.env.REACT_APP_CORS_PATH}/**`, proxy({
    target: process.env.REACT_APP_API_URL,
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
    pathRewrite: {
      [`^${process.env.REACT_APP_CORS_PATH}`]: '',
    },
    onProxyReq: function(proxyReq) {
      proxyReq.setHeader('origin', process.env.REACT_APP_PUBLIC_URL);
    },
  }));

  // proxies media assets for PDF generation avoid CORS
  app.use('/media', proxy({
    target: process.env.REACT_APP_MEDIA_URL,
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
  }));
  app.use('/maps', proxy({
    target: process.env.REACT_APP_MAP_URL,
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
  }))
};
