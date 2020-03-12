import { StubBarColor } from 'apps/metrics/Metrics.model';
import Items from 'components/items';
import { localeNumber } from 'lib/number';
import React from 'react';
import { useIntl } from 'react-intl';
import CSS from './ChartVertical.module.scss';

export function ChartVertical({ data, stub }) {
  const intl = useIntl();

  const isNoData = data.every((item) => item.value === 0);
  const dataToRender = isNoData ? stub : data;
  const total = dataToRender.reduce((memo, item) => memo + item.value, 0) || 1;
  const barStyle = isNoData
    ? { backgroundColor: StubBarColor }
    : null;
  const textStyle = isNoData
    ? { color: StubBarColor }
    : null;

  return (
    <Items className={CSS.root} flow="row" templateColumns="2fr 1fr 2fr" gap={1} align="center">
      {isNoData && (
        <div className={CSS.noDataLabel}>
          {intl.formatMessage({ id: 'fragments.home.verification.statistic.noData' })}
        </div>
      )}
      {dataToRender.map((item) => {
        const percent = 100 * (item.value / total);
        const value = isNoData ? 0 : item.value;
        return [
          <div key={`${item.label}-label`} style={textStyle}>{item.label}</div>,
          <div key={`${item.label}-value`} style={textStyle} className={CSS.value}>{`${value.toPrecision(2)}% (${localeNumber(value)})`}</div>,
          <div
            key={`${item.label}-bar`}
            style={{
              width: `${percent}%`,
              ...barStyle,
            }}
            className={CSS.bar}
          />,
        ];
      })}
    </Items>
  );
}
