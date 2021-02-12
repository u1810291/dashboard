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
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from 'apps/theme/app.theme';
import { AppBootstrap } from 'apps/AppBootstrap';

// eslint-disable-next-line no-console
console.log('Mati version test CI', process.env.REACT_APP_VERSION);

ReactDOM.render(
  <MuiThemeProvider theme={AppTheme}>
    <StoreProvider>
      <AppIntlProvider>
        <BrowserRouter>
          <AppBootstrap />
          <AppRouter />
          <NotificationsContainer />
          <OverlayContainer />
        </BrowserRouter>
      </AppIntlProvider>
    </StoreProvider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
