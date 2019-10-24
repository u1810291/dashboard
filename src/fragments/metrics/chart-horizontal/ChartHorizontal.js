import Items from 'components/items';
import { localeNumber } from 'lib/number';
import React from 'react';
import CSS from './ChartHorizontal.module.scss';

export function ChartHorizontal({ data }) {
  const total = data.reduce((memo, item) => memo + item.value, 0) || 1;

  return (
    <Items flow="row" templateColumns="2fr 1fr 2fr" gap={2} align="center">
      {data.map((item) => {
        const percent = 100 * (item.value / total);
        return [
          <div>{item.label}</div>,
          <div className={CSS.value}>{`${percent.toPrecision(2)}% (${localeNumber(item.value)})`}</div>,
          <div
            style={{ width: `${percent}%` }}
            className={CSS.bar}
          />,
        ];
      })}
    </Items>
  );
}
