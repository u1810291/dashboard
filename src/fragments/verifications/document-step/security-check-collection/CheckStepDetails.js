import { get } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { humanize, underscore } from 'inflection';
import { formatValue } from 'lib/string';
import { Card, Grid, CardContent, Typography } from '@material-ui/core';
import CURP from 'assets/curp-logo.png';
import INE from 'assets/ine-logo.png';
import { useStyles } from './CheckStepDetails.styles';

const expandableSteps = {
  'mexican-curp-validation': {
    logo: <img src={CURP} alt="CURP logo" />,
  },
  'mexican-ine-validation': {
    logo: <img src={INE} alt="INE logo" />,
  },
};

export function CheckStepDetails({ id, data = {}, error }) {
  const classes = useStyles();
  const intl = useIntl();
  const logo = get(expandableSteps, `${id}.logo`);

  return (
    <Card raised={false} className={classes.card}>
      <CardContent>
        <Grid container spacing={1}>
          { logo && <Grid item>{logo}</Grid> }
          { error && (
            <Grid container item>
              <Typography color="error">
                {intl.formatMessage({ id: `SecurityCheckStep.${error.code}.message` })}
              </Typography>
            </Grid>
          )}
          { Object.entries(data)
            .map(([label, { value }]) => (
              <Grid container item spacing={1}>
                <Grid item xs={3} key={`${label}-key`} className={classes.label}>
                  { // TODO: BAC-5210 INE data comes in Spanish. Should be translated to English.
                    id !== 'mexican-ine-validation' ? humanize(underscore(label)) : label
                  }
                </Grid>
                <Grid item xs={3} key={`${label}-value`} className={classes.value}>
                  {formatValue(label, value)}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
