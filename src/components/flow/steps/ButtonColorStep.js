import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Card } from 'mgi-ui-components'
import CSS from './steps.css'

export default function ButtonColorStep({
  availableButtonColors = [],
  color,
  onClick = () => {}
}) {
  return (
    <div className="configure-flow-card">
      <h3>
        <FormattedMessage id="flow.colorStep.title" />
      </h3>
      <div className={CSS.flowCards}>
        {availableButtonColors.map(c => (
          <Card
            key={c}
            onClick={onClick.bind(null, { color: c })}
            className={classNames(
              CSS.flowCard,
              CSS.colorCard,
              'text-secondary',
              'text-caption',
            )}
            cardBorderStyle={c === color ? 'blue' : 'default'}
          >
            <span
              className={classNames(CSS.documentColorCardIcon, `card-icon-${c}`)}
            >
            </span>
            <FormattedMessage id={`flow.colorStep.${c}`} />
          </Card>
        ))}
      </div>
    </div>
  )
}
