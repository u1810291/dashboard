import React from 'react';
import { TeamSettings } from 'apps/collaborators';
import { Grid, Container, Box } from '@material-ui/core';
import { CompanySettings } from '../CompanySettings/CompanySettings';

export function Settings() {
  return (
    <Container maxWidth="initial">
      <Box py={3}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12} lg={6}>
            <CompanySettings />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TeamSettings />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
