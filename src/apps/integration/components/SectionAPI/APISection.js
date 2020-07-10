import { Button, Grid, Typography } from '@material-ui/core';
import { QATags } from 'models/QA.model';
import React from 'react';
import { FiCode } from 'react-icons/fi';
import { useIntl } from 'react-intl';

export function SectionAPI() {
  const intl = useIntl();

  return (
    <Grid container spacing={2} justify="space-between" alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>{intl.formatMessage({ id: 'ApiSection.title' })}</Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'ApiSection.description' })}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={6}>
            <Button
              variant="outlined"
              href="https://docs.getmati.com"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              startIcon={<FiCode size={14} />}
              data-qa={QATags.Integration.Button.ApiDoc}
            >
              {intl.formatMessage({ id: 'ApiSection.cta' })}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
