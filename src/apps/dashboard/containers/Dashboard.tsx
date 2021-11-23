import { useFullStory } from 'apps/AppBootstrap';
import { Layout, PageError, useAfkListenerLogout } from 'apps/layout';
import { Loader } from 'apps/ui';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { Routes } from 'models/Router.model';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { loadCountries } from 'state/countries/countries.actions';
import { selectAllCountriesModel } from 'state/countries/countries.selectors';
import { appLoad, merchantFlowsLoad } from 'state/merchant/merchant.actions';
import { selectClientIdModel, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { reloadPage } from 'lib/window';
import { useIntercom } from 'apps/intercom';
import { useLoadMerchant } from 'apps/merchant/hooks/loadMerchant.hook';
import { useQuery } from 'lib/url';
import { useBeamerScript } from 'apps/beamer';
import { DashboardLoader } from '../components/DashboardLoader/DashboardLoader';
import { DashboardMenu } from '../components/DashboardMenu/DashboardMenu';
import { Footer } from '../components/Footer/Footer';
import { DashboardRouter } from './Dashboard.router';

export function Dashboard() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { asMerchantId } = useQuery();
  const merchantFlowsModel = useSelector(selectMerchantFlowsModel);
  const countriesModel = useSelector(selectAllCountriesModel);
  const clientIdModel = useSelector(selectClientIdModel);
  const flowBuilderMatch = useRouteMatch(Routes.flow.details);
  const identityProfileMatch = useRouteMatch(Routes.identity.profile.details.root);
  const merchantModel = useLoadMerchant();
  const [isError, setIsError] = useState(false);
  useFullStory();
  useAfkListenerLogout();
  useIntercom();
  useBeamerScript();

  useEffect(() => {
    (async () => {
      if (LoadableAdapter.isPristine(countriesModel)) {
        try {
          await dispatch(loadCountries());
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      }
    })();
  }, [dispatch, countriesModel]);

  useEffect(() => {
    (async () => {
      if (LoadableAdapter.isPristine(clientIdModel)) {
        try {
          await dispatch(appLoad());
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      }
    })();
  }, [clientIdModel, dispatch]);

  useEffect(() => {
    if (merchantModel.isLoaded && LoadableAdapter.isPristine(merchantFlowsModel)) {
      try {
        dispatch(merchantFlowsLoad(asMerchantId));
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    }
  }, [asMerchantId, dispatch, merchantFlowsModel, merchantModel]);

  if (isError) {
    return (
      <Layout menu={<DashboardMenu />}>
        <PageError onRetry={reloadPage} />
      </Layout>
    );
  }

  if (!countriesModel.isLoaded || !merchantFlowsModel.isLoaded) {
    return <Loader />;
  }

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
