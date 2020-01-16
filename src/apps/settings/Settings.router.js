import { Billing, Pricing } from 'apps/billing';
import { BillingRoute } from 'apps/billing/guards/BillingRoute';
import { PersonalSetting } from 'apps/settings/personal-settings/PersonalSetting';
import { TeamSettings } from 'apps/settings/team-settings/TeamSettings';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export function SettingsRouter() {
  return (
    <Switch>
      <Route path="/settings/pricing" component={Pricing} />
      <BillingRoute path="/settings/billing" component={Billing} />
      <Route path="/settings/team" component={TeamSettings} />
      <Route path="/settings" component={PersonalSetting} />
    </Switch>
  );
}
