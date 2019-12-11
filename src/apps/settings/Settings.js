import { Typography } from '@material-ui/core';
import { Content } from 'components/application-box';
import Items from 'components/items';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Switch } from 'react-router-dom';
import Billing from './billing-settings';
import PersonalSetting from './personal-settings';
import Pricing from './Pricing';
import TeamSettings from './team-settings';

export default function Settings() {
  const intl = useIntl();

  return (
    <Content>
      <Items flow="row">
        <Typography variant="h2">{intl.formatMessage({ id: 'dashboard.menu.account' })}</Typography>
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
