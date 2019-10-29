import { AppRouter } from 'app.router';
import { ScrollToTop } from 'apps/routing';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  Elements as StripeElements,
  StripeProvider,
} from 'react-stripe-elements';
// Next line must stay on the top because of css variables
import 'components/theme/styles.scss';
import IntlProvider from 'components/intl-provider';
import StoreProvider from 'components/store-provider';
import { Container as NotificationsContainer } from 'components/notification';
import { Container as OverlayContainer } from 'components/overlay';
import 'clipboard-polyfill';
import 'core-js';
import * as Sentry from '@sentry/browser';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from 'app.theme';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
  });
}

ReactDOM.render(
  <MuiThemeProvider theme={AppTheme}>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
      <StripeElements>
        <StoreProvider>
          <IntlProvider>
            <BrowserRouter>
              <ScrollToTop>
                <AppRouter />
                <NotificationsContainer
                  closeButton={false}
                  hideProgressBar
                  pauseOnHover={false}
                  draggable={false}
                  autoClose={5000}
                />
                <OverlayContainer />
              </ScrollToTop>
            </BrowserRouter>
          </IntlProvider>
        </StoreProvider>
      </StripeElements>
    </StripeProvider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
