import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Card } from 'mgi-ui-components'
import CSS from './steps.css'
import icons from './language-icons'

export default function ButtonLanguageStep({
  availableLanguages = [
    'en_US',
    'es_MX'
  ]
}) {
  return (
    <div className="configure-flow-card">
      <h3>
        <FormattedMessage id="flow.languageStep.title" />
      </h3>
      <div className={CSS.flowCards}>
        {availableLanguages.map(lang => (
          <Card
            className={classNames(CSS.flowCard, CSS.languageCard, 'text-secondary', 'text-caption')}
            // onClick={this.handleCardClick.bind(this, type)}
          >
            <img src={icons[lang]} alt=""/>
            <FormattedMessage id={`flow.languageStep.${lang}`} />
          </Card>
        ))}
      </div>
    </div>
  )
}
