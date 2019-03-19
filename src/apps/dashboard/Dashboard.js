import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
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
import { Settings } from 'src/apps/settings'
import { signOut } from 'src/state/auth'
import { getMerchant, saveConfiguration } from 'src/state/merchant'
import MatiLogo from 'src/assets/mati-logo-white.svg'
import IdentitiesIcon from './icons/icon-history.svg'
import ConfigurationIcon from './icons/icon-customize.svg'
import AccountIcon from './icons/icon-account.svg'
import FAQIcon from './icons/icon-faq.svg'
import SettingsIcon from './icons/settings.svg'
// import FeaturesIcon from './icons/features.svg'
import LogoutIcon from './icons/logout.svg'
import PricingIcon from './icons/pricing.svg'
import CSS from './Dashboard.css'

function MenuIconWrapper({icon}) {
  return (
    <div className={CSS.menuIconWrapper}>
      {icon}
    </div>
  )
}


export default
@injectIntl
@connect(
  state => ({
    token: state.auth.token,
    configuration: state.merchant.configuration,
    isOwner:
      !state.merchant.collaborators ||
      !state.merchant.collaborators.find(col => col.user === state.auth.user.id && col.role === 2),
    isOwnerIsLoading: !state.merchant.collaborators
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
    const { isOwner, isOwnerIsLoading } = this.props
    if (isOwnerIsLoading) return <Menu />
    return (
      <Menu>
        {isOwner ? (
          <MenuItemLink to="/" noActive>
            <MatiLogo />
          </MenuItemLink>
        ) : (
          <MenuItemLink to="/verifications" noActive>
            <MatiLogo />
          </MenuItemLink>
        )}
        {isOwner && (
          <MenuItemLink
            to="/"
            label={formatMessage({ id: 'dashboard.menu.configuration' })}
            icon={<ConfigurationIcon />}
          />
        )}
        <MenuItemLink
          to="/verifications"
          label={formatMessage({ id: 'dashboard.menu.identities' })}
          icon={<IdentitiesIcon />}
        />
        <MenuItemSpacer />
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
          {isOwner && (
            <MenuItemLink
              to="/pricing"
              label={formatMessage({ id: 'dashboard.menu.upgrade' })}
              icon={<MenuIconWrapper icon={<PricingIcon/>} />}
            />
          )}
          {isOwner && (
            <MenuItemLink
              to="/settings"
              label={formatMessage({ id: 'dashboard.menu.settings' })}
              icon={<MenuIconWrapper icon={<SettingsIcon/>} />}
            />
          )}
          <MenuItemButton
            onClick={this.handleSignOut}
            label={formatMessage({ id: 'dashboard.menu.signout' })}
            icon={<MenuIconWrapper icon={<LogoutIcon/>} />}
          />
        </MenuItemCollection>
      </Menu>
    )
  }

  render() {
    const { isOwnerIsLoading } = this.props
    if (isOwnerIsLoading) return null
    return (
      <React.Fragment>
        <Helmet>
          <title>Mati Dashboard</title>
        </Helmet>
        <ApplicationBox menu={this.renderMenu()}>
          <Switch>
            <Route exact path="/verifications" component={VerificationHistory} />
            <Route exact path="/verifications/:id" component={VerificationItem} />
            <OwnersRoute path="/settings" component={Settings} />
            <OwnersRoute exact path="/pricing" component={PricingPage} />
            <OwnersRoute path="/" component={Configuration} />
          </Switch>
        </ApplicationBox>
      </React.Fragment>
    )
  }
}

@connect(state => ({
  isOwner:
    !state.merchant.collaborators ||
    !state.merchant.collaborators.find(col => col.user === state.auth.user.id && col.role === 2)
}))
class OwnersRoute extends React.Component {
  render() {
    const { component: Component, isOwner, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          isOwner ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/verifications',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }
}
