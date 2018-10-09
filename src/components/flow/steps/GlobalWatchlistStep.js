import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Card from 'src/components/card'
import CSS from './steps.css'

export default function GlobalWatchlistStep({
  globalWatchList = true,
  onClick = () => {}
}) {
  return (
    <div className="configure-flow-card">
      <p>
        <FormattedMessage id="flow.watchlistStep.title" />
      </p>
      <div className={CSS.flowCards}>
        <Card
          cardBorderStyle={globalWatchList ? 'selected' : 'default'}
          className={classNames(CSS.flowCard, CSS.watchlistCard, 'text-secondary', 'text-caption')}
          onClick={onClick.bind(null, { globalWatchList: true })}
        >
          <FormattedMessage id={`flow.watchlistStep.yes`} />
        </Card>
        <Card
          cardBorderStyle={globalWatchList ? 'default' : 'selected' }
          className={classNames(CSS.flowCard, CSS.watchlistCard, 'text-secondary', 'text-caption')}
          onClick={onClick.bind(null, { globalWatchList: false })}
        >
          <FormattedMessage id={`flow.watchlistStep.no`} />
        </Card>
      </div>
    </div>
  )
}
