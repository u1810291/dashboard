import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import Items from 'components/items'
import { Content } from 'components/application-box'
import Integration from './Integration'
import Webhooks from './Webhooks'
import MobileDemo from './MobileDemo'
import ClientApplications from './ClientApplications'
import IntegrationCode from './IntegrationCode'

export default function InfoPage() {
  return (
    <Content>
      <Items flow="row">
        <h1>
          <FormattedMessage id="dashboard.menu.integration" />
        </h1>

        <Switch>
          <Route path="/integration/mobile-demo" component={MobileDemo} />
          <Route
            path="/integration/applications"
            component={ClientApplications}
          />
          <Route
            path="/integration/integration-code"
            component={IntegrationCode}
          />
          <Route path="/integration/webhooks" component={Webhooks} />
          <Route path="/integration" component={Integration} />
        </Switch>
      </Items>
    </Content>
  )
}
