import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import PageContentLayout from 'components/page-content-layout'
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
        <PageContentLayout>
          <nav>
            <NavLink to="/integration" exact>
              <FormattedMessage id="apps.integration.menu.integration" />
            </NavLink>
            <NavLink to="/integration/applications" exact>
              <FormattedMessage id="apps.integration.menu.applications" />
            </NavLink>
            <NavLink to="/integration/integration-code" exact>
              <FormattedMessage id="apps.integration.menu.integration_code" />
            </NavLink>
            <NavLink to="/integration/webhooks" exact>
              <FormattedMessage id="apps.integration.menu.webhooks" />
            </NavLink>
            <NavLink to="/integration/mobile-demo" exact>
              <FormattedMessage id="apps.integration.menu.mobile_demo" />
            </NavLink>
          </nav>
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
        </PageContentLayout>
      </Items>
    </Content>
  )
}
