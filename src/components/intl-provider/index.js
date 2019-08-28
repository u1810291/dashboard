import React from 'react'
import { get } from 'lodash'
import { IntlProvider } from 'react-intl'
import translations from 'translations'
import { useSelector } from 'react-redux';

const defaultLang = 'en'

const Intl = ({ language = defaultLang, children }) => {
  const currentLang = useSelector(state => get(state, 'merchant.configuration.dashboard.language'));
  return (
    <IntlProvider locale={currentLang} messages={translations[currentLang]}>
      {children}
    </IntlProvider>
  )
}

export default Intl