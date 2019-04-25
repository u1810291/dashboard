import React from 'react'
import requireContext from 'require-context.macro'
import { addParameters, addDecorator, configure } from '@storybook/react'
import 'src/components/theme/styles.scss'
import { Container as OverlayContainer } from 'src/components/overlay'
import IntlProvider from 'src/components/intl-provider'
import { Container as NotificationsContainer } from 'src/components/notification'
import storyStylesDecorator from './storyStylesDecorator'

import { BrowserRouter } from 'react-router-dom'

function fakeRouterDecorator(story) {
  return <BrowserRouter>{story()}</BrowserRouter>
}

function overlayDecorator(story) {
  return (
    <IntlProvider>
      <React.Fragment>
        {story()}
        <NotificationsContainer />
        <OverlayContainer />
      </React.Fragment>
    </IntlProvider>
  )
}

addDecorator(storyStylesDecorator)
addDecorator(fakeRouterDecorator)
addDecorator(overlayDecorator)

const req = requireContext('../src', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({ sortStoriesByKind: /\// })
configure(loadStories, module)
