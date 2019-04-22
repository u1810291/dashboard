import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// Next line must stay on the top because of css variables
import 'src/components/theme/styles.scss'
import IntlProvider from 'src/components/intl-provider'
import { I18nProvider } from '@lingui/react'
import StoreProvider from 'src/components/store-provider'
import SentryLogger from 'src/components/sentry-logger'
import ScrollToTop from 'src/components/scroll-to-top'
import Root from 'src/apps'
import { Container as NotificationsContainer } from 'src/components/notification'
import { Container as OverlayContainer } from 'src/components/overlay'
import 'clipboard-polyfill'
import 'polyfill-object.fromentries'
import * as Sentry from '@sentry/browser'

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
    <I18nProvider locale="en">
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
    </I18nProvider>
  </ErrorLoggerWrapper>,
  document.getElementById('root')
)
