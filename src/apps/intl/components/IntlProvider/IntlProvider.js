import { DEFAULT_LOCALE } from 'models/Intl.model';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectLanguage } from 'state/merchant/merchant.selectors';
import { translations } from '../../locale';

export function AppIntlProvider({ children }) {
  const currentLang = useSelector(selectLanguage);

  return (
    <IntlProvider
      locale={currentLang}
      defaultLocale={DEFAULT_LOCALE}
      messages={translations[currentLang]}
    >
      {children}
    </IntlProvider>
  );
}
