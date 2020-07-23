import { AppRouter } from 'app.router';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Elements as StripeElements, StripeProvider } from 'react-stripe-elements';
// Next line must stay on the top because of css variables
import 'components/theme/styles.scss';
import { AppIntlProvider } from 'apps/intl';
import StoreProvider from 'components/store-provider';
import { NotificationsContainer } from 'components/notification';
import { Container as OverlayContainer } from 'components/overlay';
import 'clipboard-polyfill';
import 'core-js';
import * as Sentry from '@sentry/browser';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from 'apps/theme/app.theme';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
  });
}

// eslint-disable-next-line no-console
console.log('Mati version', process.env.REACT_APP_VERSION);

ReactDOM.render(
  <MuiThemeProvider theme={AppTheme}>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
      <StripeElements>
        <StoreProvider>
          <AppIntlProvider>
            <BrowserRouter>
              <AppRouter />
              <NotificationsContainer />
              <OverlayContainer />
            </BrowserRouter>
          </AppIntlProvider>
        </StoreProvider>
      </StripeElements>
    </StripeProvider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
