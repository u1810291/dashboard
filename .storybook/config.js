import { addParameters, addDecorator, configure } from '@storybook/react'
import 'src/components/theme/styles.scss'
import storyStylesDecorator from './storyStylesDecorator'
import intlDecorator from './intlDecorator'

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({
  sortStoriesByKind: /\//
})

addDecorator(storyStylesDecorator)
addDecorator(intlDecorator)

configure(loadStories, module)
