import React from 'react'
import { useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import { PageContentLayout, Items } from 'components'
import { NoPlanSelected } from 'fragments'
import { Content } from 'components/application-box'
import Integration from './Integration'
import Webhooks from './Webhooks'
import MobileDemo from './MobileDemo'
import ClientApplications from './ClientApplications'
import IntegrationCode from './IntegrationCode'

export default function InfoPage() {
  const configuration = useSelector(
    state => state.merchant.configuration.dashboard
  )

  return (
    <Content>
      {configuration.usePlans && !configuration.stripeClientId ? (
        <PageContentLayout navigation={false} aside={false}>
          <main>
            <NoPlanSelected />
          </main>
        </PageContentLayout>
      ) : (
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
      )}
    </Content>
  )
}
