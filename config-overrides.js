const path = require('path')
const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
  config.resolve = {
    alias: {
      'src': path.resolve(__dirname, 'src/')
    }
  }

  config = injectBabelPlugin(['transform-decorators-legacy', {}], config);

  return config
}
