import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CheckStepDetails.styles';
import { CheckStepDetailsEntry } from './CheckStepDetailsEntry';

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
          {Object
            .entries(data)
            .map(([key, value]) => (<CheckStepDetailsEntry key={key} label={key} value={value} />))}
        </Grid>
      </CardContent>
    </Card>
  );
}
