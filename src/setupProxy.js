const proxy = require('http-proxy-middleware');

console.log('develop proxy started')

module.exports = function(app) {
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
