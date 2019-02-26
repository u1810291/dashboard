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
import { Configuration } from 'src/apps/configuration'
import PricingPage from 'src/apps/pricing'
import VerificationHistory from 'src/apps/verification-history'
import VerificationItem from 'src/apps/verification-history/verification-item'
import DevelopersRoute from 'src/apps/developers'
//import { AccountSettings } from 'src/apps/account-settings'
import { signOut } from 'src/state/auth'
import { getMerchant, saveConfiguration } from 'src/state/merchant'
import MatiLogo from 'src/assets/mati-logo-white.svg'
import IdentitiesIcon from './icons/icon-history.svg'
import ConfigurationIcon from './icons/icon-customize.svg'
import AccountIcon from './icons/icon-account.svg'
import DevelopersIcon from './icons/icon-developers.svg'
import FAQIcon from './icons/icon-faq.svg'

export default
@injectIntl
@connect(
  state => ({
    token: state.auth.token,
    configuration: state.merchant.configuration
  }),
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

  renderMenu() {
    const { formatMessage } = this.props.intl
    return (
      <Menu>
        <MenuItemLink to="/" noActive>
          <MatiLogo />
        </MenuItemLink>
        <MenuItemLink
          to="/"
          label={formatMessage({ id: 'dashboard.menu.configuration' })}
          icon={<ConfigurationIcon />}
        />
        <MenuItemLink
          to="/verifications"
          label={formatMessage({ id: 'dashboard.menu.identities' })}
          icon={<IdentitiesIcon />}
        />
        <MenuItemSpacer />
        <MenuItemLink
          to="/developers"
          label={formatMessage({ id: 'dashboard.menu.developers' })}
          icon={<DevelopersIcon />}
        />
        <MenuItemLink
          to="https://docs.getmati.com"
          external={true}
          label={formatMessage({ id: 'dashboard.menu.docs' })}
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
          <MenuItemLink
            to="/pricing"
            label={formatMessage({ id: 'dashboard.menu.upgrade' })}
          />
          {/*<MenuItemLink to="/account-settings" label={formatMessage({ id: 'dashboard.menu.accountSettings' })} />*/}
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
        <Helmet>
          <title>Mati Dashboard</title>
        </Helmet>
        <ApplicationBox menu={this.renderMenu()}>
          <Switch>
            <Route exact path="/developers" component={DevelopersRoute} />
            <Route
              exact
              path="/verifications"
              component={VerificationHistory}
            />
            <Route
              exact
              path="/verifications/:id"
              component={VerificationItem}
            />
            {/*<Route exact path="/account-settings" component={AccountSettings} />*/}
            <Route exact path="/pricing" component={PricingPage} />
            <Route path="/" component={Configuration} />
          </Switch>
        </ApplicationBox>
      </React.Fragment>
    )
  }
}
