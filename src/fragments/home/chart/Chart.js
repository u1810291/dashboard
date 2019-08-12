import React from 'react';
import { Card, H1, Items, Text } from 'components';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import classNames from 'classnames';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import CSS from './Chart.module.scss';

export default function Chart({ title, data, children }) {
  return (
    <Card>
      <Items gap={2} flow="column" justifyContent="space-between" inline>
        <H1>{title}</H1>
        <Text className={CSS.text}>{moment().format('DD MMMM YYYY')}</Text>
      </Items>
      <Text className={classNames([CSS.text, CSS.amountText])}>
        <FormattedMessage id="fragments.home.verification.card.amount"/>
      </Text>
      <Items flow="column" justifyContent="start" inline>
        {children}
      </Items>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={data}
          margin={{
            top: 40, right: 0, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" hide/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip hide/>
          <Line connectNulls type="monotone" dataKey="count"/>
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
