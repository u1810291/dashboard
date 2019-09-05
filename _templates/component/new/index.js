const inflection = require('inflection');

module.exports = {
  params: ({ args }) => ({
    componentPath: args.name
      .split('/')
      .slice(0, -1)
      .join('/'),
    componentName: inflection.camelize(
      args.name.replace(/-/g, '_').replace(/.+\/([^/]+)$/g, '$1'),
    ),
    ...args,
  }),
};
