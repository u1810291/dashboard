import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Content } from 'src/components/application-box'
import Integration from './Integration'
import MobileDemo from './MobileDemo'
import ClientApplications from './ClientApplications'
import IntegrationCode from './IntegrationCode'

export default function InfoPage() {
  return (
    <Content>
      <Switch>
        <Route path="/integration/mobile-demo" component={MobileDemo} />
        <Route path="/integration/applications" component={ClientApplications} />
        <Route path="/integration/integration-code" component={IntegrationCode} />
        <Route path="/integration" component={Integration} />
      </Switch>
    </Content>
  )
}
