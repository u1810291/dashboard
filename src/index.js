import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// Next line must stay on the top because of css variables
import 'src/components/theme/styles.scss'
import IntlProvider from 'src/components/intl-provider'
import StoreProvider from 'src/components/store-provider'
import SentryLogger from 'src/components/sentry-logger'
import ScrollToTop from 'src/components/scroll-to-top'
import Root from 'src/apps'
import { Container as NotificationsContainer } from 'src/components/notification'
import { Container as OverlayContainer } from 'src/components/overlay'
import 'clipboard-polyfill'
import * as Sentry from '@sentry/browser'

import 'flex-box-grid/dist/scss/index.scss'

let ErrorLoggerWrapper = React.Fragment

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT
  })
  ErrorLoggerWrapper = SentryLogger
}

ReactDOM.render(
  <ErrorLoggerWrapper>
    <IntlProvider>
      <StoreProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Root />
            <NotificationsContainer
              closeButton={false}
              hideProgressBar={true}
              pauseOnHover={false}
              draggable={false}
              autoClose={5000}
            />
            <OverlayContainer />
          </ScrollToTop>
        </BrowserRouter>
      </StoreProvider>
    </IntlProvider>
  </ErrorLoggerWrapper>,
  document.getElementById('root')
)
