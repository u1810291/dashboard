import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch } from 'react-router-dom';

import { Content } from 'components/application-box';
import Items from 'components/items';
import TeamSettings from './team-settings';
import Billing from './billing-settings';
import Pricing from './Pricing';
import PersonalSetting from './personal-settings';

export default function Settings() {
  return (
    <Content>
      <Items flow="row">
        <h1>
          <FormattedMessage id="dashboard.menu.account" />
        </h1>
        <Switch>
          <Route path="/settings/pricing" component={Pricing} />
          <Route path="/settings/billing" component={Billing} />
          <Route path="/settings/team" component={TeamSettings} />
          <Route path="/settings" component={PersonalSetting} />
        </Switch>
      </Items>
    </Content>
  );
}
