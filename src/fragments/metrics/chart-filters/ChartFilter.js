import React from 'react'
import { Items } from 'components'
import Button from 'components/button'
import { FormattedMessage } from 'react-intl'

export default function ChartFilters({ handleClick, filter }) {
  return (
    <Items flow="column" justifyContent="space-between" inline>
      <Button
        type="submit"
        buttonStyle={filter === 'days30' ? 'active' : 'primary'}
        onClick={() => handleClick('days30')}
      >
        <FormattedMessage id="fragments.home.verification.filters.days30" />
      </Button>
      <Button
        type="submit"
        buttonStyle={filter === 'currentMonth' ? 'active' : 'primary'}
        onClick={() => handleClick('currentMonth')}
      >
        <FormattedMessage id="fragments.home.verification.filters.month" />
      </Button>
      <Button
        type="submit"
        buttonStyle={filter === 'currentWeek' ? 'active' : 'primary'}
        onClick={() => handleClick('currentWeek')}
      >
        <FormattedMessage id="fragments.home.verification.filters.week" />
      </Button>
    </Items>
  );
}
