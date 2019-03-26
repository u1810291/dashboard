import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PageContentLayout from 'src/components/page-content-layout'

export default function IntegrationLayout({ children }) {
  return (
    <PageContentLayout>
      <nav>
        <NavLink to="/integration" exact>
          <FormattedMessage id="apps.integration.menu.integration" />
        </NavLink>
        <NavLink to="/integration/mobile-demo" exact>
          <FormattedMessage id="apps.integration.menu.mobile_demo" />
        </NavLink>
        <NavLink to="/integration/applications" exact>
          <FormattedMessage id="apps.integration.menu.applications" />
        </NavLink>
        <NavLink to="/integration/integration-code" exact>
          <FormattedMessage id="apps.integration.menu.integration_code" />
        </NavLink>
      </nav>
      {children}
    </PageContentLayout>
  )
}
