import PropTypes from 'prop-types';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { flowRight } from 'lodash/fp';
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

class Dashboard extends React.Component {
  static propTypes = {
    getIntegrationCode: PropTypes.func.isRequired,
    getMerchant: PropTypes.func.isRequired,
    isOwner: PropTypes.bool.isRequired,
    isOwnerIsLoading: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
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
  }

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
    const { isOwnerIsLoading } = this.props;
    if (isOwnerIsLoading) return null;
    return (
      <>
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
            <OwnersRoute path="/product" component={Product} />
            <OwnersRoute path="/" component={Metrics} />
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
      configuration: state.merchant.configuration,
      isOwner:
        !state.merchant.collaborators
        || !state.merchant.collaborators.find(
          (col) => col.user === state.auth.user.id && col.role === 2,
        ),
      isOwnerIsLoading: !state.merchant.collaborators,
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
            pathname: '/verifications',
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
