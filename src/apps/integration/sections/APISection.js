import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FiCode } from 'react-icons/fi';
import { useIntl } from 'react-intl';

export function APISection() {
  const intl = useIntl();

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h5" gutterBottom>{intl.formatMessage({ id: 'ApiSection.title' })}</Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'ApiSection.description' })}</Typography>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              href="https://docs.getmati.com/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              startIcon={<FiCode size={14} />}
            >
              {intl.formatMessage({ id: 'ApiSection.cta' })}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
