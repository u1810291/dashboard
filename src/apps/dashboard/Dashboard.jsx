import { InfoPage } from 'apps/info';
import Metrics from 'apps/metrics';
import { Product } from 'apps/product';
import { OwnerRoute } from 'apps/routing';
import { BlockedRoute } from 'apps/routing/BlockedRoute';
import { ROOT_PATH } from 'apps/routing/routing.model';
import Settings from 'apps/settings';
import { VerificationDetail } from 'apps/verification-detail';
import VerificationHistory from 'apps/verification-history';
import ApplicationBox from 'components/application-box';
import { ContainerLoader } from 'components/contrainer-loader';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { signOut } from 'state/auth/auth.actions';
import { selectUserEmail } from 'state/auth/auth.selectors';
import { getIntegrationCode, getMerchant } from 'state/merchant/merchant.actions';
import { selectShouldPassOnboarding } from 'state/merchant/merchant.selectors';
import { MenuBar } from './MenuBar';
import Questions from './questions';

export function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [shouldPassOnboarding, isLoadingShouldPassOnboarding] = useSelector(selectShouldPassOnboarding);
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getIntegrationCode());
        await dispatch(getMerchant());
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
  }, [dispatch, history]);


  if (isLoadingShouldPassOnboarding) {
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
          <Route path="/identities/:id/:demoId?" component={VerificationDetail} />
          <Route exact path="/identities" component={VerificationHistory} />
          <OwnerRoute path="/metrics" component={Metrics} />
          <OwnerRoute exact path="/" component={Product} />
        </BlockedRoute>
      </Switch>
    </ApplicationBox>,
  ];
}
