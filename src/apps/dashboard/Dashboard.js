import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { ApplicationBox, Button } from 'mgi-ui-components'
import { Onboarding } from '.'
import { signOut } from 'src/state/auth'
import MatiLogo from 'src/assets/mati-logo.svg'
import HomeIcon from 'src/assets/icon-home.svg'
// import SettingsIcon from 'src/assets/icon-settings.svg'
// import DocumentIcon from 'src/assets/icon-document.svg'
import CSS from './Dashboard.css'

const sidebarItems = [
  <Link to="/" className="mgi-application-box-logo">
    <img src={MatiLogo} alt="" />
  </Link>,
  <Link to="/dashboard">
    <img src={HomeIcon} alt="" />
  </Link>,
  // <Link to="/settings">
  //   <img src={SettingsIcon} alt="" />
  // </Link>,
  // <Link to="/help">
  //   <img src={DocumentIcon} alt="" />
  // </Link>
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
      <Button className={CSS.signoutButton} onClick={this.handleSignOut}>
        <FormattedMessage id="signout" />
      </Button>
      <Switch>
        <Route path="/" component={Onboarding} />
      </Switch>
    </ApplicationBox>
  }
}
