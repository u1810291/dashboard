import React from 'react';
import { FormattedMessage } from 'react-intl';
import { localeNumber } from 'lib/number';
import { Card, Items } from 'components';
import { useStyles } from './VerificationsTotal.styles';

export function VerificationsTotal({ statistic }) {
  const classes = useStyles();
  const { total, days30, currentMonth, today, currentWeek } = statistic;

  return (
    <Card padding={2}>
      <Items flow="row" gap="2" className={CSS.block}>
        <div>
          <h3 className={classes.titleNumber}>{localeNumber(total)}</h3>
          <div className={classes.title}>
            <FormattedMessage id="fragments.home.verification.statistic.all" />
          </div>
        </div>
        <div>
          <p className={classes.number}>{localeNumber(days30)}</p>
          <div className={classes.title}>
            <FormattedMessage id="fragments.home.verification.statistic.days" />
          </div>
        </div>
        <div>
          <p className={classes.number}>{localeNumber(currentMonth)}</p>
          <div className={classes.title}>
            <FormattedMessage id="fragments.home.verification.statistic.month" />
          </div>
        </div>
        <div>
          <p className={classes.number}>{localeNumber(currentWeek)}</p>
          <div className={classes.title}>
            <FormattedMessage id="fragments.home.verification.statistic.week" />
          </div>
        </div>
        <div>
          <p className={classes.number}>{localeNumber(today)}</p>
          <div className={classes.title}>
            <FormattedMessage id="fragments.home.verification.statistic.today" />
          </div>
        </div>
      </Items>
    </Card>
  );
}
