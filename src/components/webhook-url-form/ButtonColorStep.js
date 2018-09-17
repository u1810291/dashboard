import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Card } from 'mgi-ui-components'
import CSS from './steps.css'

export default function ButtonColorStep({
  availableButtonColors = [
    'blue',
    'green',
    'red',
    'pink',
    'orange',
    'yellow'
  ]
}) {
  return (
    <div className="configure-flow-card">
      <h3>
        <FormattedMessage id="flow.colorStep.title" />
      </h3>
      <div className={CSS.flowCards}>
        {availableButtonColors.map(color => (
          <Card
            className={classNames(CSS.flowCard, CSS.colorCard, 'text-secondary', 'text-caption')}
            // onClick={this.handleCardClick.bind(this, type)}
          >
            <span
              className={classNames(CSS.documentColorCardIcon, `card-icon-${color}`)}
            >
            </span>
            <FormattedMessage id={`flow.colorStep.${color}`} />
          </Card>
        ))}
      </div>
    </div>
  )
}
