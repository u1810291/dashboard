import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  Elements as StripeElements,
  StripeProvider
} from 'react-stripe-elements'
// Next line must stay on the top because of css variables
import 'components/theme/styles.scss'
import IntlProvider from 'components/intl-provider'
import StoreProvider from 'components/store-provider'
import SentryLogger from 'components/sentry-logger'
import ScrollToTop from 'components/scroll-to-top'
import Root from 'apps'
import { Container as NotificationsContainer } from 'components/notification'
import { Container as OverlayContainer } from 'components/overlay'
import 'clipboard-polyfill'
import 'core-js'
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
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
      <StripeElements>
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
      </StripeElements>
    </StripeProvider>
  </ErrorLoggerWrapper>,
  document.getElementById('root')
)
