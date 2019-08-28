import React from 'react'
import { connect, useSelector } from 'react-redux'
import { flowRight } from 'lodash/fp'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import ApplicationBox from 'components/application-box'
import { default as MenuBar } from './MenuBar'
import Product from 'apps/product'
import VerificationHistory from 'apps/verification-history'
import VerificationDetail from 'apps/verification-detail'
import { Settings } from 'apps/settings'
import Launch from 'apps/launch'
import Metrics from 'apps/metrics'
import Info from 'apps/info'
import { signOut } from 'state/auth'
import {
  getMerchant,
  saveConfiguration,
  getIntegrationCode,
} from 'state/merchant'

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
    const { isOwner, isOwnerIsLoading } = this.props;
    return <MenuBar isOwner={isOwner} isOwnerIsLoading={isOwnerIsLoading} />
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
            <OwnersRoute path="/metrics" component={Metrics} />
            <Route path="/info" component={Info} />
            <OwnersRoute path="/product" component={Product} />
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

const OwnersRoute = ({ component: Component, ...rest }) => {
  const isOwner = useSelector(state => ({
    isOwner:
      !state.merchant.collaborators ||
      !state.merchant.collaborators.find(
        col => col.user === state.auth.user.id && col.role === 2
      )
  }));
  
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
};

