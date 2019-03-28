const inflection = require('inflection')
module.exports = {
  params: ({ args }) => {
    return {
      componentName: inflection.camelize(args.name.replace(/.+\/([^\/]+)$/g, '$1')),
      ...args
    }
  }
}
