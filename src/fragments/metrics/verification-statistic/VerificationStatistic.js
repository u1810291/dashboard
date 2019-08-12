import React from 'react'
import { Card, Items } from 'components'
import { FormattedMessage } from 'react-intl'

import CSS from './VerificationsStatistic.module.scss'

export default function VerificationStatistic({ statistic }) {
  const { total, days30, currentMonth, today, currentWeek } = statistic;

  return (
    <Card padding={2} className={CSS.statistic}>
      <Items flow="column" justifyContent="space-between" inline className={CSS.block}>
        <div className={CSS.block}>
          <p className={CSS.number}>{total || 0}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.all" />
          </div>
        </div>
        <div className={CSS.block}>
          <p className={CSS.number}>{days30 || 0}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.days" />
          </div>
        </div>
        <div className={CSS.block}>
          <p className={CSS.number}>{currentMonth || 0}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.month" />
          </div>
        </div>
      </Items>
      <Items flow="column" justifyContent="start" inline>
        <div className={CSS.blockVertical}>
          <p className={CSS.number}>{today || 0}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.today" />
          </div>
        </div>
        <div className={CSS.blockVertical}>
          <p className={CSS.number}>{currentWeek || 0}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.week" />
          </div>
        </div>
      </Items>
    </Card>
  );
}
