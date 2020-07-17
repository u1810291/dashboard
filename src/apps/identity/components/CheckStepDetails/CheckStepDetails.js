import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { formatValue } from 'lib/string';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CheckStepDetails.styles';

export function CheckStepDetails({ data = {}, error }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card raised={false} className={classes.card}>
      <CardContent>
        <Grid container spacing={1}>
          {error && (
            <Grid container item>
              <Typography color="error">
                {intl.formatMessage({ id: `SecurityCheckStep.${error.code}.message` })}
              </Typography>
            </Grid>
          )}
          {Object.entries(data).map(([key, value]) => (
            <Grid container item spacing={1} key={key}>
              <Grid item xs={3} className={classes.label}>
                {intl.formatMessage({
                  id: `identity.field.${key}`,
                  defaultMessage: key,
                })}
              </Grid>
              <Grid item xs={3} className={classes.value}>
                {formatValue(key, value)}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
