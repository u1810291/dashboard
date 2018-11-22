const path = require('path')
const webpackConfig = require('react-scripts/config/webpack.config.dev.js')

webpackConfig.resolve.alias.src = path.resolve(__dirname, 'src')
// TODO: fix next plugin lines with something more adequately
webpackConfig.module.rules[2].oneOf[1].options.plugins.push(
  ['@babel/proposal-decorators', { legacy: true }]
)
webpackConfig.module.rules[2].oneOf[1].options.plugins.push(
  ['inline-react-svg']
)
module.exports = {
  webpackConfig,
  require: [
    path.join(__dirname, 'src/application.css')
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/components/Wrapper')
  },
  components: 'src/components/**/index.js',
  skipComponentsWithoutExample: true
}
