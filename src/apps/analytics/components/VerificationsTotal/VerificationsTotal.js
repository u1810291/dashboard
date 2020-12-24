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
    <Paper className={classes.paper}>
      <Grid container direction="column" justify="center" className={classes.wrapper}>
        <Grid container justify="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <Box mb={0.4} fontSize={36} fontWeight="bold" color="common.black90" className={classes.title}>
              { isLoaded && localeNumber(all)}
            </Box>
            <Box mb={{ xs: 4, md: 0 }} color="common.black75" className={classes.text}>
              {intl.formatMessage({ id: 'Analytics.verificationTotal.total' })}
            </Box>
          </Grid>
          <Grid container item xs={12} md={8} className={classes.itemsWrapper}>
            <Box>
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
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
