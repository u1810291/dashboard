import { Grid, Box, Paper } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { localeNumber } from 'lib/number';
import { useStyles } from './VerificationsTotal.styles';

export function VerificationsTotal({ statistic }) {
  const classes = useStyles();
  const { total, days30, currentMonth, today, currentWeek } = statistic;

  return (
    <Paper className={classes.paper}>
      <Box padding={2}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <h3 className={classes.titleNumber}>{localeNumber(total)}</h3>
            <div className={classes.title}>
              <FormattedMessage id="fragments.home.verification.statistic.all" />
            </div>
          </Grid>
          <Grid item>
            <p className={classes.number}>{localeNumber(days30)}</p>
            <div className={classes.title}>
              <FormattedMessage id="fragments.home.verification.statistic.days" />
            </div>
          </Grid>
          <Grid item>
            <p className={classes.number}>{localeNumber(currentMonth)}</p>
            <div className={classes.title}>
              <FormattedMessage id="fragments.home.verification.statistic.month" />
            </div>
          </Grid>
          <Grid item>
            <p className={classes.number}>{localeNumber(currentWeek)}</p>
            <div className={classes.title}>
              <FormattedMessage id="fragments.home.verification.statistic.week" />
            </div>
          </Grid>
          <Grid item>
            <p className={classes.number}>{localeNumber(today)}</p>
            <div className={classes.title}>
              <FormattedMessage id="fragments.home.verification.statistic.today" />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
