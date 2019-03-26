import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import ApplicationBox from 'src/components/application-box'
import ApplicationMenu, {
  MenuItemLink,
  MenuItemButton,
  MenuItemSpacer
} from 'src/components/application-menu'
import Icons from 'src/components/icons'
import { Configuration } from 'src/apps/configuration'
import VerificationHistory from 'src/apps/verification-history'
import VerificationItem from 'src/apps/verification-history/verification-item'
import { Settings } from 'src/apps/settings'
import Info from 'src/apps/info'
import Integration from 'src/apps/integration'
import { signOut } from 'src/state/auth'
import { getMerchant, saveConfiguration } from 'src/state/merchant'
import MatiLogo from 'src/assets/mati-logo-v2.svg'
import IdentitiesIcon from './icons/icon-history.svg'
import ConfigurationIcon from './icons/icon-customize.svg'
import AccountIcon from './icons/icon-account.svg'
import SettingsIcon from './icons/settings.svg'
import LogoutIcon from './icons/logout.svg'

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
    if (isOwnerIsLoading) return <ApplicationMenu />
    return (
      <ApplicationMenu>
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
          to="/info"
          label={formatMessage({ id: 'dashboard.menu.info' })}
          icon={<Icons.Info />}
        />

        {isOwner && (
          <MenuItemLink
            to="/integration"
            label={formatMessage({ id: 'dashboard.menu.integration' })}
            icon={<SettingsIcon />}
          />
        )}

        {isOwner && (
          <MenuItemLink
            to="/settings"
            label={formatMessage({ id: 'dashboard.menu.account' })}
            icon={<AccountIcon />}
          />
        )}

        {!isOwner && (
          <MenuItemButton
            onClick={this.handleSignOut}
            label={formatMessage({ id: 'dashboard.menu.signout' })}
            icon={<LogoutIcon />}
          />
        )}
      </ApplicationMenu>
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
            <Route path="/info" component={Info} />
            <OwnersRoute path="/integration" component={Integration} />
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
