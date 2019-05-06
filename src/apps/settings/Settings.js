import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import { Content } from 'components/application-box'
import Items from 'components/items'
import TeamSettings from './team-settings'
import Pricing from './Pricing'
import SettingsLayout from './SettingsLayout'

export default function Settings() {
  return (
    <Content>
      <Items flow="row">
        <h1>
          <FormattedMessage id="dashboard.menu.account" />
        </h1>

        <SettingsLayout>
          <Switch>
            <Route path="/settings/pricing" component={Pricing} />
            <Route path="/settings" component={TeamSettings} />
          </Switch>
        </SettingsLayout>
      </Items>
    </Content>
  )
}
