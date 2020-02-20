import { signOut } from 'apps/auth/state/auth.actions';
import { selectCurrentPlanId } from 'apps/billing/state/billing.selectors';
import { Layout, PageLoader } from 'apps/layout';
import { ROOT_PATH } from 'apps/routing';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { merchantLoad } from 'state/merchant/merchant.actions';
import { selectMerchantModel, selectShouldPassOnboarding } from 'state/merchant/merchant.selectors';
import { AlertBanner } from '../components/AlertBanner/AlertBanner';
import { DashboardMenu } from '../components/DashboardMenu/DashboardMenu';
import { Questions } from '../components/Questions/Questions';
import { DashboardRouter } from './Dashboard.router';

export function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const boardingModel = useSelector(selectShouldPassOnboarding);
  const merchantModel = useSelector(selectMerchantModel);
  const currentPlanId = useSelector(selectCurrentPlanId);

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
    return <PageLoader />;
  }

  if (boardingModel.value) {
    return <Questions key="questions" />;
  }

  return [
    <Helmet key="head">
      <title>{intl.formatMessage({ id: 'page.title' })}</title>
    </Helmet>,
    <Layout
      key="app"
      menu={<DashboardMenu />}
      banner={!currentPlanId && <AlertBanner />}
    >
      <DashboardRouter />
    </Layout>,
  ];
}
