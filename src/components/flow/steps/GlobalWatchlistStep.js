import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Card } from 'mgi-ui-components'
import CSS from './steps.css'

export default function GlobalWatchlistStep({
  globalWatchList = true,
  onClick = () => {}
}) {
  return (
    <div className="configure-flow-card">
      <h3>
        <FormattedMessage id="flow.watchlistStep.title" />
      </h3>
      <div className={CSS.flowCards}>
        <Card
          cardBorderStyle={globalWatchList ? 'blue' : 'default'}
          className={classNames(CSS.flowCard, CSS.watchlistCard, 'text-secondary', 'text-caption')}
          onClick={onClick.bind(null, { globalWatchList: true })}
        >
          <FormattedMessage id={`flow.watchlistStep.yes`} />
        </Card>
        <Card
          cardBorderStyle={globalWatchList ? 'default' : 'blue' }
          className={classNames(CSS.flowCard, CSS.watchlistCard, 'text-secondary', 'text-caption')}
          onClick={onClick.bind(null, { globalWatchList: false })}
        >
          <FormattedMessage id={`flow.watchlistStep.no`} />
        </Card>
      </div>
    </div>
  )
}
