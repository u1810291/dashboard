import { Box, Grid, Paper } from '@material-ui/core';
import { localeNumber } from 'lib/number';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectVerificationsCount } from '../../state/Analytics.selectors';
import { useStyles } from './VerificationsTotal.styles';

export function VerificationsTotal() {
  const classes = useStyles();
  const intl = useIntl();
  const verificationsCount = useSelector(selectVerificationsCount);

  const verificationByStatus = [
    {
      key: 'verified',
      count: verificationsCount?.verified,
      color: 'common.green',
    },
    {
      key: 'rejected',
      count: verificationsCount?.rejected,
      color: 'common.red',
    },
  ];

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" justify="center" className={classes.wrapper}>
        <Grid container justify="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <Box mb={0.4} fontSize={36} fontWeight="bold" color="common.black90" className={classes.title}>
              { verificationsCount && localeNumber(verificationsCount?.all)}
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
                      {verificationsCount && localeNumber(count)}
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
