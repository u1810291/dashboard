import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import ApplicationBox from 'src/components/application-box'
import { Onboarding } from '.'
import { UpgradePlan } from '.'
import { signOut } from 'src/state/auth'
import MatiLogo from 'src/assets/mati-logo.svg'
import HomeIcon from 'src/assets/icon-home.svg'
import SettingsIcon from 'src/assets/icon-settings.svg'
// import DocumentIcon from 'src/assets/icon-document.svg'

const sidebarItems = [
  <Link to="/" className="mgi-application-box-logo" key="/">
    <img src={MatiLogo} alt="" />
  </Link>,
  <Link to="/dashboard" key="/dashboard">
    <img src={HomeIcon} alt="" />
  </Link>,
  <Link to="/upgrade" key="/upgrade">
    <img src={SettingsIcon} alt="" />
  </Link>
]

@connect(null, { signOut })
export default class Dashboard extends React.Component {
  handleSignOut = () => {
    this.props.signOut()
    window.localStorage.clear()
    this.props.history.push('/')
  }

  render() {
    return <ApplicationBox sidebarItems={sidebarItems}>
      <Helmet>
        <title>Mati Dashboard</title>
      </Helmet>
      <Switch>
        <Route exact path="/upgrade" component={UpgradePlan} />
        <Route path="/" component={Onboarding} />
      </Switch>
    </ApplicationBox>
  }
}
