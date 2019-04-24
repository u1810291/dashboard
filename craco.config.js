const path = require('path')

module.exports = {
  babel: {
    plugins: [
      [
        'module-resolver',
        {
          root: ['.']
        }
      ]
    ]
  },
  style: {
    css: {
      loaderOptions: {
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }
  }
}
