import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Card from 'src/components/card'
import CSS from './steps.css'
import icons from './language-icons'

export default function ButtonLanguageStep({
  availableLanguages = [],
  language,
  onClick = () => {}
}) {
  return (
    <div className="configure-flow-card">
      <p>
        <FormattedMessage id="flow.languageStep.title" />
      </p>
      <div className={CSS.flowCards}>
        {availableLanguages.map(lang => (
          <Card
            key={lang}
            className={classNames(CSS.flowCard, CSS.languageCard, 'text-secondary', 'text-caption')}
            cardBorderStyle={lang === language ? 'selected' : 'default'}
            onClick={onClick.bind(null, { language: lang })}
          >
            <img src={icons[lang]} alt=""/>
          </Card>
        ))}
      </div>
    </div>
  )
}
