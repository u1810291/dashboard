import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Card } from 'mgi-ui-components'
import CSS from './steps.css'

export default function GlobalWatchlistStep({
  enableWatchList = true
}) {
  return (
    <div className="configure-flow-card">
      <h3>
        <FormattedMessage id="flow.watchlistStep.title" />
      </h3>
      <div className={CSS.flowCards}>
        <Card
          className={classNames(CSS.flowCard, CSS.watchlistCard, 'text-secondary', 'text-caption')}
          // onClick={this.handleCardClick.bind(this, type)}
        >
          <FormattedMessage id={`flow.watchlistStep.yes`} />
        </Card>
        <Card
          className={classNames(CSS.flowCard, CSS.watchlistCard, 'text-secondary', 'text-caption')}
          // onClick={this.handleCardClick.bind(this, type)}
        >
          <FormattedMessage id={`flow.watchlistStep.no`} />
        </Card>
      </div>
    </div>
  )
}
