import { Grid } from '@material-ui/core';
import { Feedback } from 'fragments/info/feedback';
import React from 'react';
import { CompaniesUsingMati } from '../../components/CompaniesUsingMati/CompaniesUsingMati';
import { MatiNumbers } from '../../components/MatiNumbers/MatiNumbers';
import { PlanFeatures } from '../../components/PlanFeatures/PlansFeatures';
import { PlanList } from '../../components/PlanList/PlanList';
import { PricingRefundNotice } from '../../components/PricingRefundNotice/PricingRefundNotice';

export function Pricing() {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <PricingRefundNotice />
      </Grid>
      <Grid item>
        <PlanList />
      </Grid>
      <Grid item>
        <PlanFeatures />
      </Grid>
      <Grid item>
        <CompaniesUsingMati />
      </Grid>
      <Grid item>
        <MatiNumbers />
      </Grid>
      <Grid item>
        <Feedback />
      </Grid>
    </Grid>
  );
}
