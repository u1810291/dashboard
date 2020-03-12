import React from 'react';
import { useIntl } from 'react-intl';
import { humanize, underscore } from 'inflection';
import { formatValue } from 'lib/string';
import { Card, Grid, CardContent, Typography } from '@material-ui/core';
import { useStyles } from './CheckStepDetails.styles';

export function CheckStepDetails({ id, data = {}, error }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card raised={false} className={classes.card}>
      <CardContent>
        <Grid container spacing={1}>
          { error && (
            <Grid container item>
              <Typography color="error">
                {intl.formatMessage({ id: `SecurityCheckStep.${error.code}.message` })}
              </Typography>
            </Grid>
          )}
          { Object.entries(data)
            .map(([label, { value }]) => (
              <Grid container item spacing={1} key={label}>
                <Grid item xs={3} className={classes.label}>
                  { // TODO: BAC-5210 INE data comes in Spanish. Should be translated to English.
                    id !== 'mexican-ine-validation' ? humanize(underscore(label)) : label
                  }
                </Grid>
                <Grid item xs={3} className={classes.value}>
                  {formatValue(label, value)}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
