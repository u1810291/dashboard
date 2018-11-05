import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import classNames from 'classnames'
import ApplicationBox from 'src/components/application-box'
import Button from 'src/components/button'
import { OnboardingModal } from 'src/components/onboarding-modal'
import { Onboarding } from '.'
import { UpgradePlan } from '.'
import { Identities } from '.'
import { signOut } from 'src/state/auth'
import { getMerchant, saveConfiguration } from 'src/state/merchant'
import MatiLogo from 'src/assets/mati-logo.svg'
import HomeIcon from 'src/assets/icon-home.svg'
import DocumentIcon from 'src/assets/icon-document.svg'
import PricingIcon from 'src/assets/icon-pricing.svg'
import CSS from './Dashboard.css'

@connect(
  state => ({ token: state.auth.token, configuration: state.merchant.configuration }),
  { signOut, getMerchant, saveConfiguration }
)
export default class Dashboard extends React.Component {
  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.loadData()
    }
  }

  loadData() {
    this.props.getMerchant(this.props.token).catch(error => {
      if (error.response && error.response.status === 401) this.handleSignOut()
    })
  }

  handleSignOut = () => {
    this.props.signOut()
    window.location = '/'
  }

  handleOnboardingModalClose = () => {
    this.props.saveConfiguration(this.props.token, {
      onboardingModalShown: true
    })
  }

  render() {
    const sidebarItems = [
      <Link to="/" className="mgi-application-box-logo" key="/">
        <img src={MatiLogo} alt="" />
      </Link>,
      <Link to="/dashboard" key="/dashboard">
        <img src={HomeIcon} alt="" />
      </Link>,
      <Link to="/identities" key="/identities">
        <img src={DocumentIcon} alt="" />
      </Link>,
      <Link to="/upgrade" key="/upgrade">
        <img src={PricingIcon} alt="" />
      </Link>,
      <Button
        key="signout"
        className={classNames('mgi-application-box-sidebar-bottom', CSS.signoutButton)}
        buttonStyle="no-borders default"
        onClick={this.handleSignOut}
      >
        <span>&times;</span>
      </Button>
    ]
    return (
      <ApplicationBox sidebarItems={sidebarItems}>
        {!this.props.configuration.onboardingModalShown && (
          <OnboardingModal onClose={this.handleOnboardingModalClose} />
        )}
        <Helmet>
          <title>Mati Dashboard</title>
        </Helmet>
        <Switch>
          <Route exact path="/identities" component={Identities} />
          <Route exact path="/upgrade" component={UpgradePlan} />
          <Route path="/" component={Onboarding} />
        </Switch>
      </ApplicationBox>
    )
  }
}
