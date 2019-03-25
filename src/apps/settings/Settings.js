import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Content } from 'src/components/application-box'
import TeamSettings from './team-settings'
import IntegrationCode from './integration-code'
import DemoForMobile from './demo-for-mobile'
import ClientApplications from './client-applications'
import InstallationGuide from './installation-guide'

export default function Settings() {
  return (
    <Content>
      <Switch>
        <Route path="/settings/team-settings" component={TeamSettings} />
        <Route path="/settings/integration-code" component={IntegrationCode} />
        <Route path="/settings/demo-for-mobile" component={DemoForMobile} />
        <Route path="/settings/applications" component={ClientApplications} />
        <Route path="/settings" component={InstallationGuide} />
      </Switch>
    </Content>
  )
}
