import { StubBarColor } from 'apps/metrics/models/Metrics.model';
import { Grid } from '@material-ui/core';
import { localeNumber } from 'lib/number';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './ChartVertical.styles';

export function ChartVertical({ data, stub }) {
  const intl = useIntl();
  const classes = useStyles();
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
    <Grid container className={classes.root} spacing={1} alignItems="center">
      {isNoData && (
        <div className={classes.noDataLabel}>
          {intl.formatMessage({ id: 'fragments.home.verification.statistic.noData' })}
        </div>
      )}
      {dataToRender.map((item) => {
        const percent = 100 * (item.value / total);
        const value = isNoData ? 0 : item.value;
        return [
          <Grid item xs={4}>
            <div key={`${item.label}-label`} style={textStyle}>{item.label}</div>
          </Grid>,
          <Grid item xs={3}>
            <div key={`${item.label}-value`} style={textStyle} className={classes.value}>{`${value.toPrecision(2)}% (${localeNumber(value)})`}</div>
          </Grid>,
          <Grid item xs={5}>
            <div
              key={`${item.label}-bar`}
              style={{
                width: `${percent}%`,
                ...barStyle,
              }}
              className={classes.bar}
            />
          </Grid>,
        ];
      })}
    </Grid>
  );
}
