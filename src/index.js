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
import ScrollToTop from 'components/scroll-to-top';
import Root from 'apps';
import { Container as NotificationsContainer } from 'components/notification';
import { Container as OverlayContainer } from 'components/overlay';
import 'clipboard-polyfill';
import 'core-js';
import * as Sentry from '@sentry/browser';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
  });
}

const theme = createMuiTheme({
  spacing: 10,
  palette: {
    primary: {
      main: '#3757ff',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'inherit !important',
        },
      },
    },
    MuiInputBase: {
      text: {
        color: 'red',
      },
      root: {
        color: 'blue',
      },
    },
    MuiMenuItem: {
      root: {
        color: 'white',
      },
    },
  },
  typography: {
    h1: {
      fontSize: '28px',
    },
    h2: {
      fontSize: '18px',
    },
    h3: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    fontFamily: ['Lato', 'Helvetica Neue', 'sans-serif'],
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
      <StripeElements>
        <StoreProvider>
          <IntlProvider>
            <BrowserRouter>
              <ScrollToTop>
                <Root />
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
