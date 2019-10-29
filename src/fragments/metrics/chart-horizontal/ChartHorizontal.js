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
          <div key={`${item.label}-label`}>{item.label}</div>,
          <div key={`${item.label}-value`} className={CSS.value}>{`${percent.toPrecision(2)}% (${localeNumber(item.value)})`}</div>,
          <div
            key={`${item.label}-bar`}
            style={{ width: `${percent}%` }}
            className={CSS.bar}
          />,
        ];
      })}
    </Items>
  );
}
