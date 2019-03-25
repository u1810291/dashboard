import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PageContentLayout from 'src/components/page-content-layout'

export default function SettingsLayout({ children }) {
  return (
    <PageContentLayout>
      <nav>
        <NavLink to="/settings" exact>
          <FormattedMessage id="settings.installationGuide" />
        </NavLink>
        <NavLink to="/settings/team-settings">
          <FormattedMessage id="settings.teamSettings" />
        </NavLink>
        <NavLink to="/settings/demo-for-mobile">
          <FormattedMessage id="settings.demo_for_mobile" />
        </NavLink>
        <NavLink to="/settings/applications">
          <FormattedMessage id="settings.applications" />
        </NavLink>
        <NavLink to="/settings/integration-code">
          <FormattedMessage id="settings.integration_code" />
        </NavLink>
      </nav>
      {children}
    </PageContentLayout>
  )
}
