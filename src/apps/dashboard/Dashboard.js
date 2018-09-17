import React from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import { ApplicationBox } from 'mgi-ui-components'
import { Onboarding } from '.'
import { NotFound } from 'src/apps/not-found'

import MatiLogo from 'src/assets/mati-logo.svg'
import HomeIcon from 'src/assets/icon-home.svg'
import SettingsIcon from 'src/assets/icon-settings.svg'
import DocumentIcon from 'src/assets/icon-document.svg'

const sidebarItems = [
  <Link to="/" className="mgi-application-box-logo"><img src={MatiLogo} /></Link>,
  <Link to="/dashboard"><img src={HomeIcon} /></Link>,
  <Link to="/settings"><img src={SettingsIcon} /></Link>,
  <Link to="/help"><img src={DocumentIcon} /></Link>
]

export default function Dashboard(props) {
  return (
    <ApplicationBox sidebarItems={sidebarItems}>
      <Switch>
        <Route path="/dashboard/onboarding" component={Onboarding} />
        <Redirect exact path="/dashboard" to="/dashboard/onboarding" />
        <Route component={NotFound} />
      </Switch>
    </ApplicationBox>
  )
}
