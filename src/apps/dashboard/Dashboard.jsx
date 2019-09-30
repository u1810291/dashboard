import PropTypes from 'prop-types';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { flowRight } from 'lodash/fp';
import { get } from 'lodash';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

import ApplicationBox from 'components/application-box';
import Product from 'apps/product';
import VerificationHistory from 'apps/verification-history';
import VerificationDetail from 'apps/verification-detail';
import Settings from 'apps/settings';
import Metrics from 'apps/metrics';
import Info from 'apps/info';
import { signOut } from 'state/auth';
import {
  getMerchant,
  saveConfiguration,
  getIntegrationCode,
} from 'state/merchant';
import MenuBar from './MenuBar';
import Questions from './questions';

class Dashboard extends React.Component {
  static propTypes = {
    getIntegrationCode: PropTypes.func.isRequired,
    getMerchant: PropTypes.func.isRequired,
    isOwner: PropTypes.bool.isRequired,
    isOwnerIsLoading: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    email: PropTypes.string,
    shouldPassOnboarding: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    email: undefined,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { token } = this.props;
    if (prevProps.token !== token) {
      this.loadData();
    }
  }

  handleSignOut = () => {
    this.props.signOut();
    window.location = '/';
  };

  async loadData() {
    // eslint-disable-next-line no-shadow
    const { getIntegrationCode, getMerchant, token } = this.props;
    try {
      await getIntegrationCode(token);
      await getMerchant(token);
    } catch (error) {
      if (error.response && error.response.status === 401) this.handleSignOut();
      else throw error;
    }
  }

  renderMenu() {
    const { isOwner, isOwnerIsLoading } = this.props;
    return <MenuBar isOwner={isOwner} isOwnerIsLoading={isOwnerIsLoading} />;
  }

  render() {
    const { isOwnerIsLoading, shouldPassOnboarding, email } = this.props;
    if (isOwnerIsLoading) return null;
    if (shouldPassOnboarding) {
      return <Questions email={email} />;
    }

    return (
      <>
        <Helmet>
          <title>Mati Dashboard</title>
        </Helmet>
        <ApplicationBox menu={this.renderMenu()}>
          <Switch>
            <Route
              exact
              path="/identities"
              component={VerificationHistory}
            />
            <Route
              path="/identities/:demo?/:id"
              component={VerificationDetail}
            />
            <OwnersRoute path="/settings" component={Settings} />
            <Route path="/info" component={Info} />
            <OwnersRoute path="/metrics" component={Metrics} />
            <OwnersRoute path="/" component={Product} />
          </Switch>
        </ApplicationBox>
      </>
    );
  }
}

export default flowRight(
  injectIntl,
  connect(
    (state) => ({
      token: state.auth.token,
      email: state.auth.user.email,
      configuration: state.merchant.configuration,
      isOwner:
        !state.merchant.collaborators
        || !state.merchant.collaborators.find(
          (col) => col.user === state.auth.user.id && col.role === 2,
        ),
      isOwnerIsLoading: !state.merchant.collaborators,
      shouldPassOnboarding: get(state.merchant.configurations, 'dashboard.shouldPassOnboarding', false),
    }),
    { signOut, getMerchant, saveConfiguration, getIntegrationCode },
  ),
)(Dashboard);

const OwnersRoute = ({ component: Component, ...rest }) => {
  const isOwner = useSelector((state) => ({
    isOwner:
      !state.merchant.collaborators
      || !state.merchant.collaborators.find(
        (col) => col.user === state.auth.user.id && col.role === 2,
      ),
  }));

  return (
    <Route
      {...rest}
      render={(props) => (isOwner ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/identities',
            state: { from: props.location },
          }}
        />
      ))}
    />
  );
};

OwnersRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
};
