const inflection = require('inflection')
module.exports = {
  params: ({ args }) => {
    return {
      componentName: inflection.camelize(
        args.name.replace(/-/g, '_').replace(/.+\/([^\/]+)$/g, '$1')
      ),
      ...args
    }
  }
}
