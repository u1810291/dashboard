import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { countToArray } from 'lib/number';
import React from 'react';
import { useIntl } from 'react-intl';
import { FAQ_COUNTER } from './FAQ.model';

export function FAQ() {
  const intl = useIntl();

  return (
    <Paper>
      <Box p={2}>
        <Grid container direction="column" spacing={2}>
          {countToArray(FAQ_COUNTER).map((item) => (
            <Grid item key={item}>
              <Typography variant="h3" component="h3" gutterBottom>
                {intl.formatMessage({ id: `FAQ.${item}.question` })}
              </Typography>
              <Box color="grey.700">
                <Typography variant="body1" gutterBottom>
                  {intl.formatMessage({ id: `FAQ.${item}.answer` })}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
