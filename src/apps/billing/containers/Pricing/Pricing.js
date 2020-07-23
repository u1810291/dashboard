import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { RequestDemo } from '../../components/RequestDemo/RequestDemo';
import { PlanFeatures } from '../../components/PlanFeatures/PlansFeatures';
import { PricingTitle } from '../../components/PricingTitle/PricingTitle';

export function Pricing() {
  return (
    <Container>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <PricingTitle />
        </Grid>
        <Grid item>
          <RequestDemo />
        </Grid>
        <Grid item>
          <PlanFeatures />
        </Grid>
      </Grid>
    </Container>
  );
}
