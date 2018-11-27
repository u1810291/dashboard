import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import ApplicationBox, {
  Menu,
  MenuItemLink,
  MenuItemButton,
  MenuItemSpacer,
  MenuItemCollection
} from 'src/components/application-box'
import { OnboardingModal } from 'src/components/onboarding-modal'
import { Configuration } from 'src/apps/configuration'
import UpgradePlan from './UpgradePlan'
import VerificationHistory from 'src/apps/verification-history'
import DevelopersRoute from 'src/apps/developers'
import { signOut } from 'src/state/auth'
import { getMerchant, saveConfiguration } from 'src/state/merchant'
import MatiLogo from 'src/assets/mati-logo.svg'
import IdentitiesIcon from './icons/icon-history.svg'
import ConfigurationIcon from './icons/icon-customize.svg'
import AccountIcon from './icons/icon-account.svg'
import DevelopersIcon from './icons/icon-developers.svg'
import FAQIcon from './icons/icon-faq.svg'

export default
@injectIntl
@connect(
  state => ({ token: state.auth.token, configuration: state.merchant.configuration }),
  { signOut, getMerchant, saveConfiguration }
)
class Dashboard extends React.Component {
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

  renderMenu() {
    const { formatMessage } = this.props.intl
    return (
      <Menu>
        <MenuItemLink to="/">
          <MatiLogo />
        </MenuItemLink>
        <MenuItemLink
          to="/verifications"
          label={formatMessage({ id: 'dashboard.menu.identities' })}
          icon={<IdentitiesIcon />}
        />
        <MenuItemLink
          to="/"
          label={formatMessage({ id: 'dashboard.menu.configuration' })}
          icon={<ConfigurationIcon />}
        />
        <MenuItemSpacer />
        <MenuItemLink
          to="/developers"
          label={formatMessage({ id: 'dashboard.menu.developers' })}
          icon={<DevelopersIcon />}
        />
        <MenuItemLink
          to="https://faq.getmati.com"
          external={true}
          label={formatMessage({ id: 'dashboard.menu.faq' })}
          icon={<FAQIcon />}
        />
        <MenuItemCollection
          label={formatMessage({ id: 'dashboard.menu.account' })}
          icon={<AccountIcon />}
        >
          <MenuItemLink to="/upgrade" label={formatMessage({ id: 'dashboard.menu.upgrade' })} />
          <MenuItemButton
            onClick={this.handleSignOut}
            label={formatMessage({ id: 'dashboard.menu.signout' })}
          />
        </MenuItemCollection>
      </Menu>
    )
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.configuration.onboardingModalShown && (
          <OnboardingModal onClose={this.handleOnboardingModalClose} />
        )}

        <Helmet>
          <title>Mati Dashboard</title>
        </Helmet>
        <ApplicationBox menu={this.renderMenu()}>
          <Switch>
            <Route exact path="/developers" component={DevelopersRoute} />
            <Route exact path="/verifications" component={VerificationHistory} />
            <Route exact path="/upgrade" component={UpgradePlan} />
            <Route path="/" component={Configuration} />
          </Switch>
        </ApplicationBox>
      </React.Fragment>
    )
  }
}
