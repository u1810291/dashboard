import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { PageContentLayout, PageContentMenu } from 'components'

export default function IntegrationLayout({ children }) {
  return (
    <PageContentLayout>
      <PageContentMenu>
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
      </PageContentMenu>
      {children}
    </PageContentLayout>
  )
}
