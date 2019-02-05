const path = require('path')
const webpackConfig = require('react-scripts/config/webpack.config.dev.js')

webpackConfig.resolve.alias.src = path.resolve(__dirname, 'src')
webpackConfig.module.rules[2].oneOf[1].options.plugins.push([
  '@babel/proposal-decorators',
  { legacy: true }
])
webpackConfig.module.rules[2].oneOf[1].options.plugins.push([
  'inline-react-svg'
])
module.exports = {
  webpackConfig,
  require: [path.join(__dirname, 'src/components/theme/styles.scss')],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/components/Wrapper')
  },
  components: 'src/components/**/index.js',
  skipComponentsWithoutExample: true,
  pagePerSection: true,
  sections: [
    {
      name: 'UI Components Library',
      description: 'Global ID UI library',
      components: 'src/components/**/index.js'
    },
    {
      name: 'Fragments',
      description: 'Application UI fragments in isolation',
      // components: 'src/fragments/!(configuration)/**/index.js',
      sections: [
        {
          name: 'Configuration',
          description: 'Configuration page fragments',
          components: 'src/fragments/configuration/**/index.js'
        },
        {
          name: 'Verifications',
          components: 'src/fragments/verifications/**/index.js'
        },
        {
          name: 'Account settings',
          components: 'src/fragments/account/**/index.js'
        },
        {
          name: 'Signup and signin',
          components: 'src/fragments/signup/**/index.js'
        }
      ]
    }
  ]
}
