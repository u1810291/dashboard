import React from 'react';
import { TeamSettings } from 'apps/collaborators';
import { Grid, Container, Box } from '@material-ui/core';
import { RoleRenderGuard } from 'apps/merchant/guards/RoleRenderGuard';
import { WithAgent } from 'models/Collaborator.model';
import { CompanySettings } from '../CompanySettings/CompanySettings';
import { AccountPolicySettings } from '../AccountPolicySettings/AccountPolicySettings';

export function Settings() {
  return (
    <Container maxWidth={false}>
      <Box py={3}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12} lg={6}>
            <CompanySettings />
            <AccountPolicySettings />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RoleRenderGuard roles={WithAgent}>
              <TeamSettings />
            </RoleRenderGuard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
