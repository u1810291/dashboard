import { Box, Grid, Paper } from '@material-ui/core';
import { loadVerificationsCount } from 'apps/analytics/state/metrics.actions';
import { selectFilter, selectVerificationsCount } from 'apps/analytics/state/metrics.selectors';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './VerificationsTotal.styles';
import { localeNumber } from '../../../../lib/number';

export function VerificationsTotal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();
  const metricsFilter = useSelector(selectFilter);
  const { value: { all, verified, rejected }, isLoaded } = useSelector(selectVerificationsCount);

  useEffect(() => {
    dispatch(loadVerificationsCount(metricsFilter));
  }, [dispatch, metricsFilter]);

  const verificationByStatus = [
    {
      key: 'verified',
      count: verified,
      color: 'common.green',
    },
    {
      key: 'rejected',
      count: rejected,
      color: 'common.red',
    },
  ];

  return (
    <Paper>
      <Box px={{ xs: 2, md: 3 }} py={3.5}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} md={6} mb={4}>
            <Box mb={0.4} fontSize={36} fontWeight="bold" color="common.black90" className={classes.title}>
              { isLoaded && localeNumber(all)}
            </Box>
            <Box mb={{ xs: 4, md: 0 }} color="common.black75" className={classes.text}>
              {intl.formatMessage({ id: 'Analytics.verificationTotal.total' })}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mb={2} color="common.black75">
              {intl.formatMessage({ id: 'Analytics.verificationTotal.label' })}
            </Box>
            <Box className={classes.itemWrapper}>
              {verificationByStatus.map(({ key, color, count }) => (
                <Box key={key} className={classes.item}>
                  <Box mb={0.4} fontSize={24} fontWeight="bold" color={color}>
                    {isLoaded && localeNumber(count)}
                  </Box>
                  <Box color="common.black75">
                    {intl.formatMessage({ id: `Analytics.verificationTotal.${key}` })}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
