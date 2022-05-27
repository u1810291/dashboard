import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createTheme';
import { translations } from 'apps/intl/locale';
import { AppTheme } from 'apps/theme';
import { DEFAULT_LOCALE, SupportedLocales } from 'models/Intl.model';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

export interface IProviderProps {
  isIntl: boolean;
  isMui: boolean;
  locale: SupportedLocales;
  theme: Theme;
}

const defaultProviderProps: IProviderProps = {
  isIntl: true,
  isMui: true,
  locale: DEFAULT_LOCALE,
  theme: AppTheme,
};

type TestRenderProps = IProviderProps & Parameters<typeof render>[1];

export function testRender(comp: React.ReactElement, testRenderProps?: TestRenderProps): ReturnType<typeof render> {
  const { isIntl, isMui, locale, theme, ...renderOptions } = { ...defaultProviderProps, ...testRenderProps };

  let children = comp;

  if (isMui) {
    children = <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
  }

  if (isIntl) {
    children = (
      <IntlProvider
        locale={locale}
        defaultLocale={DEFAULT_LOCALE}
        messages={translations[locale] as any}
      >
        {children}
      </IntlProvider>
    );
  }

  return render(children, renderOptions);
}
