import { Billing, BillingRoute, Pricing } from 'apps/billing';
import { Page404 } from 'apps/layout';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PersonalSetting } from '../PersonalSettings/PersonalSetting';
import { TeamSettings } from '../TeamSettings/TeamSettings';

export function SettingsRouter() {
  return (
    <Switch>
      <Route path="/settings/pricing" component={Pricing} />
      <BillingRoute path="/settings/billing" component={Billing} />
      <Route path="/settings/team" component={TeamSettings} />
      <Route path="/settings" exact component={PersonalSetting} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
