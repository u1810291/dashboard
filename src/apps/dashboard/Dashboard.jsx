import { InfoPage } from 'apps/info';
import Metrics from 'apps/metrics';
import Product from 'apps/product';
import { OwnerRoute } from 'apps/routing';
import { BlockedRoute } from 'apps/routing/BlockedRoute';
import { ROOT_PATH } from 'apps/routing/routing.model';
import Settings from 'apps/settings';
import VerificationDetail from 'apps/verification-detail';
import VerificationHistory from 'apps/verification-history';
import ApplicationBox from 'components/application-box';
import { ContainerLoader } from 'components/contrainer-loader';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { signOut } from 'state/auth';
import { getIntegrationCode, getMerchant } from 'state/merchant/merchant.actions';
import { MenuBar } from './MenuBar';
import Questions from './questions';

export function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const shouldPassOnboarding = useSelector(({ merchant }) => merchant.configurations.dashboard.shouldPassOnboarding);
  const [email, token] = useSelector(({ auth }) => [auth.user.email, auth.token]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getIntegrationCode(token));
        await dispatch(getMerchant(token));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(signOut());
          history.push(ROOT_PATH);
        } else {
          throw error;
        }
      }
    };

    loadData();
  }, [token, dispatch, history]);


  if (shouldPassOnboarding === undefined) {
    return <ContainerLoader />;
  }

  if (shouldPassOnboarding) {
    return <Questions key="questions" email={email} />;
  }

  return [
    <Helmet key="head">
      <title>Mati Dashboard</title>
    </Helmet>,
    <ApplicationBox key="app" menu={<MenuBar />}>
      <Switch>
        <OwnerRoute path="/settings" component={Settings} />
        <Route path="/info" component={InfoPage} />
        <BlockedRoute>
          <Route path="/identities/:id" component={VerificationDetail} />
          <Route exact path="/identities" component={VerificationHistory} />
          <OwnerRoute path="/metrics" component={Metrics} />
          <OwnerRoute exact path="/" component={Product} />
        </BlockedRoute>
      </Switch>
    </ApplicationBox>,
  ];
}
