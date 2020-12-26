import { AppRouter } from 'app.router';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// Next line must stay on the top because of css variables
import 'styles/global.scss';
import { AppIntlProvider } from 'apps/intl';
import { StoreProvider } from 'apps/store';
import { NotificationsContainer } from 'apps/ui';
import { OverlayContainer } from 'apps/overlay';
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
console.log('Mati version test CI', process.env.REACT_APP_VERSION);

ReactDOM.render(
  <MuiThemeProvider theme={AppTheme}>
    <StoreProvider>
      <AppIntlProvider>
        <BrowserRouter>
          <AppRouter />
          <NotificationsContainer />
          <OverlayContainer />
        </BrowserRouter>
      </AppIntlProvider>
    </StoreProvider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
