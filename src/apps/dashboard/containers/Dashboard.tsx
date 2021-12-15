import { useFullStory } from 'apps/AppBootstrap';
import { Layout, useAfkListenerLogout } from 'apps/layout';
import { Routes } from 'models/Router.model';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { appLoad } from 'state/merchant/merchant.actions';
import { selectClientIdModel } from 'state/merchant/merchant.selectors';
import { useRouteMatch } from 'react-router-dom';
import { useIntercom } from 'apps/intercom';
import { useBeamerScript } from 'apps/beamer';
import { useLoadMerchant } from 'apps/merchant/hooks/loadMerchant.hook';
import { DashboardLoader } from '../components/DashboardLoader/DashboardLoader';
import { DashboardMenu } from '../components/DashboardMenu/DashboardMenu';
import { Footer } from '../components/Footer/Footer';
import { DashboardRouter } from './Dashboard.router';

export function Dashboard() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const flowBuilderMatch = useRouteMatch(Routes.flow.details);
  const identityProfileMatch = useRouteMatch(Routes.identity.profile.details.root);
  const clientIdModel = useSelector(selectClientIdModel);
  useLoadMerchant();
  useIntercom();
  useFullStory();
  useBeamerScript();
  useAfkListenerLogout();

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(clientIdModel)) {
        try {
          await dispatch(appLoad());
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadData();
  }, [clientIdModel, dispatch]);


  return [
    <Helmet key="head">
      <title>{intl.formatMessage({ id: 'page.title' })}</title>
    </Helmet>,
    <Layout
      key="app"
      menu={<DashboardMenu />}
    >
      <DashboardLoader />
      <DashboardRouter />
      {!flowBuilderMatch && !identityProfileMatch && (
        <Footer />
      )}
    </Layout>,
  ];
}
