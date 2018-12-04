const path = require('path')

module.exports = {
  babel: {
    plugins: [
      ['@babel/proposal-decorators', { legacy: true }],
      ['module-resolver', {
        'root': ['.']
      }],
      ['inline-react-svg']
    ]
  },
  style: {
    css: {
      loaderOptions: {
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    },
  }
}
