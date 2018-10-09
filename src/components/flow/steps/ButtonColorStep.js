import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Card from 'src/components/card'
import CSS from './steps.css'

export default function ButtonColorStep({
  availableButtonColors = [],
  color,
  onClick = () => {}
}) {
  return (
    <div className="configure-flow-card">
      <p>
        <FormattedMessage id="flow.colorStep.title" />
      </p>
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
            cardBorderStyle={c === color ? 'selected' : 'default'}
          >
            <span
              className={classNames(CSS.documentColorCardIcon, `card-icon-${c}`)}
            >
            </span>
          </Card>
        ))}
      </div>
    </div>
  )
}
