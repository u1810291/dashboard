import requireContext from 'require-context.macro'
import { addParameters, addDecorator, configure } from '@storybook/react'
import 'src/components/theme/styles.scss'
import storyStylesDecorator from './storyStylesDecorator'
import intlDecorator from './intlDecorator'

addDecorator(intlDecorator)
addDecorator(storyStylesDecorator)

const req = requireContext('../src', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({ sortStoriesByKind: /\// })
configure(loadStories, module)
