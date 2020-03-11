import { localeNumber } from 'lib/number';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Items } from 'components';
import { FormattedMessage } from 'react-intl';

import CSS from './VerificationsTotal.module.scss';

export function VerificationsTotal({ statistic }) {
  const { total, days30, currentMonth, today, currentWeek } = statistic;

  return (
    <Card padding={2}>
      <Items flow="row" gap="2" className={CSS.block}>
        <div>
          <h3 className={CSS.titleNumber}>{localeNumber(total)}</h3>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.all" />
          </div>
        </div>
        <div>
          <p className={CSS.number}>{localeNumber(days30)}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.days" />
          </div>
        </div>
        <div>
          <p className={CSS.number}>{localeNumber(currentMonth)}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.month" />
          </div>
        </div>
        <div>
          <p className={CSS.number}>{localeNumber(currentWeek)}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.week" />
          </div>
        </div>
        <div>
          <p className={CSS.number}>{localeNumber(today)}</p>
          <div className={CSS.title}>
            <FormattedMessage id="fragments.home.verification.statistic.today" />
          </div>
        </div>
      </Items>
    </Card>
  );
}

VerificationsTotal.propTypes = {
  statistic: PropTypes.shape().isRequired,
};
