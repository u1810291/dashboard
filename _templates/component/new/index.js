const inflection = require('inflection')
module.exports = {
  params: ({ args }) => {
    return {
      componentName: inflection.transform(args.name.replace(/\-/g, '_'), [
        'classify',
        'demodulize'
      ]),
      ...args
    }
  }
}
