import Info from 'apps/info';
import Metrics from 'apps/metrics';
import Product from 'apps/product';
import { OwnerRoute } from 'apps/routing';
import { BlockedRoute } from 'apps/routing/BlockedRoute';
import Settings from 'apps/settings';
import VerificationDetail from 'apps/verification-detail';
import VerificationHistory from 'apps/verification-history';
import ApplicationBox from 'components/application-box';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { signOut } from 'state/auth';
import { getIntegrationCode, getMerchant } from 'state/merchant';
import MenuBar from './MenuBar';
import Questions from './questions';

export function Dashboard() {
  const dispatch = useDispatch();
  const isOwner = useSelector((state) => {
    if (!state.merchant.collaborators) {
      return true;
    }
    const userId = state.auth.user.id;
    const collaborators = state.merchant.collaborators || [];
    return collaborators.findIndex((item) => item.user === userId && item.role === 2) < 0;
  });
  const isOwnerIsLoading = useSelector(({ merchant }) => !merchant.collaborators);
  const shouldPassOnboarding = useSelector(({ merchant }) => get(merchant.configurations, 'dashboard.shouldPassOnboarding', false));
  const email = useSelector(({ auth }) => auth.user.email);
  const token = useSelector(({ auth }) => auth.token);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getIntegrationCode(token));
        await dispatch(getMerchant(token));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(signOut());
          window.location = '/';
        } else {
          throw error;
        }
      }
    };

    loadData();
  }, [token, dispatch]);


  if (shouldPassOnboarding) {
    return <Questions key="questions" email={email} />;
  }

  return [
    <Helmet key="head">
      <title>Mati Dashboard</title>
    </Helmet>,
    <ApplicationBox key="app" menu={<MenuBar isOwner={isOwner} isOwnerIsLoading={isOwnerIsLoading} />}>
      <Switch>
        <OwnerRoute path="/settings" component={Settings} />
        <Route path="/info" component={Info} />
        <BlockedRoute>
          <Route exact path="/identities" component={VerificationHistory} />
          <Route path="/identities/:demo?/:id" component={VerificationDetail} />
          <OwnerRoute path="/metrics" component={Metrics} />
          <OwnerRoute exact path="/" component={Product} />
        </BlockedRoute>
      </Switch>
    </ApplicationBox>,
  ];
}
