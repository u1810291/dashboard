import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Route, Switch, NavLink } from 'react-router-dom'
import { Content } from 'src/components/application-box'
import TeamSettings from './team-settings'
import IntegrationCode from './integration-code'
import DemoForMobile from './demo-for-mobile'
import ClientApplications from './client-applications'
import InstallationGuide from './installation-guide'
import CSS from './Settings.scss'

export default function Settings() {
  return (
    <Content className={CSS.container}>
      <div className={CSS.leftBlock}>
        <ul className={CSS.leftMenu}>
          <NavLink to="/settings" exact>
            <FormattedMessage id="settings.installationGuide"/>
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
        </ul>
      </div>

      <div className={classNames(CSS.mainBlock)}>
        <Switch>
          <Route path="/settings/team-settings" component={TeamSettings} />
          <Route path="/settings/integration-code" component={IntegrationCode} />
          <Route path="/settings/demo-for-mobile" component={DemoForMobile} />
          <Route path="/settings/applications" component={ClientApplications} />
          <Route path="/settings" component={InstallationGuide} />
        </Switch>
      </div>
    </Content>
  )
}
