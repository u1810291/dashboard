import { InfoPage } from 'apps/info';
import Metrics from 'apps/metrics';
import { Product } from 'apps/product';
import { OwnerRoute } from 'apps/routing';
import { BlockedRoute } from 'apps/routing/BlockedRoute';
import { ROOT_PATH } from 'apps/routing/routing.model';
import { Settings } from 'apps/settings/Settings';
import { VerificationDetail } from 'apps/verification-detail';
import VerificationHistory from 'apps/verification-history';
import ApplicationBox from 'components/application-box';
import { ContainerLoader } from 'components/contrainer-loader';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { signOut } from 'apps/auth/state/auth.actions';
import { merchantLoad } from 'state/merchant/merchant.actions';
import { selectMerchantModel, selectShouldPassOnboarding } from 'state/merchant/merchant.selectors';
import { Questions } from './questions/Questions';

export function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const boardingModel = useSelector(selectShouldPassOnboarding);
  const merchantModel = useSelector(selectMerchantModel);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (LoadableAdapter.isPristine(merchantModel)) {
          dispatch(merchantLoad());
        }
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
  }, [dispatch, history, merchantModel]);


  if (!boardingModel.isLoaded) {
    return <ContainerLoader />;
  }

  if (boardingModel.value) {
    return <Questions key="questions" />;
  }

  return [
    <Helmet key="head">
      <title>{intl.formatMessage({ id: 'page.title' })}</title>
    </Helmet>,
    <ApplicationBox key="app">
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
