import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Content } from 'src/components/application-box'
import TeamSettings from './team-settings'
import Pricing from './Pricing'

export default function Settings() {
  return (
    <Content>
      <Switch>
        <Route path="/settings/pricing" component={Pricing} />
        <Route path="/settings" component={TeamSettings} />
      </Switch>
    </Content>
  )
}
