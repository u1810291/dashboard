import React from 'react'
import requireContext from 'require-context.macro'
import { addParameters, addDecorator, configure } from '@storybook/react'
import 'src/components/theme/styles.scss'
import storyStylesDecorator from './storyStylesDecorator'
import intlDecorator from './intlDecorator'

import { BrowserRouter } from 'react-router-dom'

function fakeRouterDecorator(story) {
  return <BrowserRouter>{story()}</BrowserRouter>
}

addDecorator(intlDecorator)
addDecorator(storyStylesDecorator)
addDecorator(fakeRouterDecorator)

const req = requireContext('../src', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({ sortStoriesByKind: /\// })
configure(loadStories, module)
