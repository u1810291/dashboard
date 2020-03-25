import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { PlanFeatures } from '../../components/PlanFeatures/PlansFeatures';
// import { PlanList } from '../../components/PlanList/PlanList';
import { PricingTitle } from '../../components/PricingTitle/PricingTitle';
import { RequestDemo } from '../../components/CustomPlan/RequestDemo';

export function Pricing() {
  return (
    <Container>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <PricingTitle />
        </Grid>
        <Grid item>
          {/* Temporary removed FNX-148 */}
          {/* <PlanList /> */}
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
