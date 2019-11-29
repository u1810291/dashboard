const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // proxies media assets for PDF generation
  app.use('/media', proxy({
    target: process.env.REACT_APP_MEDIA_URL,
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
  }));
};
