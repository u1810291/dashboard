import React from 'react'
import { connect } from 'react-redux'
import { flowRight } from 'lodash/fp'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import ApplicationBox from 'components/application-box'
import ApplicationMenu, {
  MenuItemLink,
  MenuItemButton,
  MenuItemSpacer
} from 'components/application-menu'
import Icons from 'components/icons'
import { Configuration } from 'apps/configuration'
import VerificationHistory from 'apps/verification-history'
import VerificationDetail from 'apps/verification-detail'
import { Settings } from 'apps/settings'
import Launch from 'apps/launch'
import Info from 'apps/info'
import Integration from 'apps/integration'
import { signOut } from 'state/auth'
import {
  getMerchant,
  saveConfiguration,
  getIntegrationCode
} from 'state/merchant'
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v2.svg'
import { ReactComponent as IdentitiesIcon } from './icons/icon-menu-verifications.svg'
import { ReactComponent as ConfigurationIcon } from './icons/icon-menu-customize.svg'
import { ReactComponent as AccountIcon } from './icons/icon-account.svg'
import { ReactComponent as SettingsIcon } from './icons/icon-menu-integrate.svg'
import { ReactComponent as LaunchIcon } from './icons/icon-menu-launch.svg'
import { ReactComponent as LogoutIcon } from './icons/logout.svg'

class Dashboard extends React.Component {
  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.loadData()
    }
  }

  async loadData() {
    const { getIntegrationCode, getMerchant, token } = this.props
    try {
      await getIntegrationCode(token)
      await getMerchant(token)
    } catch (error) {
      if (error.response && error.response.status === 401) this.handleSignOut()
      else throw error
    }
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
            label={formatMessage({ id: 'dashboard.menu.launch' })}
            icon={<LaunchIcon />}
          />
        )}
        {isOwner && (
          <MenuItemLink
            to="/configuration"
            label={formatMessage({ id: 'dashboard.menu.configuration' })}
            icon={<ConfigurationIcon />}
          />
        )}
        {isOwner && (
          <MenuItemLink
            to="/integration"
            label={formatMessage({ id: 'dashboard.menu.integration' })}
            icon={<SettingsIcon />}
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
            to="/settings/personal"
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
            <Route
              exact
              path="/verifications"
              component={VerificationHistory}
            />
            <Route
              path="/verifications/:demo?/:id"
              component={VerificationDetail}
            />
            <OwnersRoute path="/settings" component={Settings} />
            <Route path="/info" component={Info} />
            <OwnersRoute path="/integration" component={Integration} />
            <OwnersRoute path="/configuration" component={Configuration} />
            <OwnersRoute path="/" component={Launch} />
          </Switch>
        </ApplicationBox>
      </React.Fragment>
    )
  }
}

export default flowRight(
  injectIntl,
  connect(
    state => ({
      token: state.auth.token,
      configuration: state.merchant.configuration,
      isOwner:
        !state.merchant.collaborators ||
        !state.merchant.collaborators.find(
          col => col.user === state.auth.user.id && col.role === 2
        ),
      isOwnerIsLoading: !state.merchant.collaborators
    }),
    { signOut, getMerchant, saveConfiguration, getIntegrationCode }
  )
)(Dashboard)

class OwnersRouteComponent extends React.Component {
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

const OwnersRoute = connect(state => ({
  isOwner:
    !state.merchant.collaborators ||
    !state.merchant.collaborators.find(
      col => col.user === state.auth.user.id && col.role === 2
    )
}))(OwnersRouteComponent)
