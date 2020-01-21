import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthRouter } from './Auth.router';
import { AuthTheme } from './Auth.theme';

export function Auth() {
  const intl = useIntl();

  return [
    <Helmet key="head">
      <title>{intl.formatMessage({ id: 'page.title' })}</title>
    </Helmet>,
    <ThemeProvider theme={AuthTheme} key="app">
      <AuthLayout>
        <AuthRouter />
      </AuthLayout>
    </ThemeProvider>,
  ];
}
