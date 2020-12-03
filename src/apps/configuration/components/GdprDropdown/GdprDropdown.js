import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';

export function GdprDropdown({ policyInterval, handleClickOpenDialog }) {
  const intl = useIntl();

  return (
    <Box ml={4.7}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          {intl.formatMessage({ id: 'Product.configuration.gdpr.warning' })}
        </Grid>
        {policyInterval && (
          <Grid item container alignItems="center" spacing={1}>
            <Grid item>
              <Box fontWeight="fontWeightBold">
                {`${policyInterval} days`}
              </Box>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleClickOpenDialog}>
                {intl.formatMessage({ id: 'Product.configuration.gdpr.submit' })}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
