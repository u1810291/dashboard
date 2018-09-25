import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'
import translations from 'src/translations'

addLocaleData([...en, ...es])
const defaultLang = 'en'

export default function Intl({language = defaultLang, children}) {
  return (
    <IntlProvider locale={language} messages={translations[language]}>
      {children}
    </IntlProvider>
  )
}
