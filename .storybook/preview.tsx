import { StylesProvider } from '@material-ui/styles';
import React from 'react';
import { appPalette } from '../src/apps/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { translations } from '../src/apps/intl/locale';
import { DEFAULT_LOCALE, LanguageList, SupportedLocales } from '../src/models/Intl.model';
import { IntlProvider } from 'react-intl';
import { generateClassName, StorybookThemeMap, StorybookThemeTypes } from '../src/models/Storybook.model';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      { name: 'black90', value: appPalette.black90 },
      { name: 'white', value: appPalette.white },
    ]
  }
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'MaterialUI App theme',
    defaultValue: StorybookThemeTypes.Light,
    toolbar: {
      icon: 'circlehollow',
      items: [StorybookThemeTypes.Light, StorybookThemeTypes.Dark],
      showName: true,
      dynamicTitle: true,
    },
  },
  locale: {
    name: 'Locale',
    description: 'Locale',
    defaultValue: SupportedLocales.EN,
    toolbar: {
      icon: 'globe',
      items: LanguageList.map((lang) => lang.locale),
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story: any, context: any) => (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={StorybookThemeMap[context.globals.theme]}>
        <IntlProvider
          locale={context.globals.locale}
          defaultLocale={DEFAULT_LOCALE}
          messages={translations[context.globals.locale] as any}
        >
          <Story />
        </IntlProvider>
      </MuiThemeProvider>
    </StylesProvider>
  ),
];
