import classNames from 'classnames';
import { Card, Text } from 'components';
import { formatDate } from 'lib/date';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CSS from './Chart.module.scss';

function tickFormat(value) {
  return formatDate(value, 'MM/DD');
}

export default function Chart({ data, ...props }) {
  return (
    <Card {...props}>
      <Text className={classNames([CSS.text, CSS.amountText])}>
        <FormattedMessage id="fragments.home.verification.card.amount" />
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="label"
            tickFormatter={tickFormat}
            padding={{ top: 5 }}
          />
          <YAxis />
          <Tooltip hide />
          <Line
            stroke="#5c75ff"
            strokeWidth={2}
            connectNulls
            type="monotone"
            dataKey="value"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
