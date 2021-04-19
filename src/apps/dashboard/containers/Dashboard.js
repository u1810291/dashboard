import { useFullStory } from 'apps/AppBootstrap';
import { signOut } from 'apps/auth/state/auth.actions';
import { useBeamerScript } from 'apps/beamer';
import { Layout, PageError } from 'apps/layout';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadCountries, loadCountriesOnlyExisting } from 'state/countries/countries.actions';
import { selectAllCountriesModel, selectCountriesOnlyExisting } from 'state/countries/countries.selectors';
import { appLoad, merchantFlowsLoad, merchantLoad } from 'state/merchant/merchant.actions';
import { selectClientIdModel, selectMerchantFlowsModel, selectMerchantModel } from 'state/merchant/merchant.selectors';
import { DashboardLoader } from '../components/DashboardLoader/DashboardLoader';
import { DashboardMenu } from '../components/DashboardMenu/DashboardMenu';
import { Footer } from '../components/Footer/Footer';
import { Loader } from '../components/Loader/Loader';
import { DashboardRouter } from './Dashboard.router';

export function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const merchantModel = useSelector(selectMerchantModel);
  const merchantFlowsModel = useSelector(selectMerchantFlowsModel);
  const countriesModel = useSelector(selectAllCountriesModel);
  const countriesOnlyExistingModel = useSelector(selectCountriesOnlyExisting);
  const clientIdModel = useSelector(selectClientIdModel);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(merchantModel)) {
        await dispatch(merchantLoad())
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              dispatch(signOut());
              history.push(Routes.root);
            } else {
              setIsError(true);
              throw error;
            }
          });
      }
    };

    loadData();
  }, [dispatch, history, merchantModel]);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(countriesModel)) {
        await dispatch(loadCountries())
          .catch((error) => {
            setIsError(true);
            console.error(error);
          });
      }
    };
    loadData();
  }, [dispatch, countriesModel]);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(countriesOnlyExistingModel)) {
        try {
          await dispatch(loadCountriesOnlyExisting());
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      }
    };
    loadData();
  }, [dispatch, countriesOnlyExistingModel]);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(clientIdModel)) {
        try {
          await dispatch(appLoad());
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      }
    };
    loadData();
  }, [clientIdModel, dispatch]);

  useEffect(() => {
    if (merchantModel.isLoaded && LoadableAdapter.isPristine(merchantFlowsModel)) {
      dispatch(merchantFlowsLoad())
        .catch((error) => {
          setIsError(true);
          console.error(error);
        });
    }
  }, [dispatch, merchantFlowsModel, merchantModel]);

  useBeamerScript();
  useFullStory();

  const handleRetry = useCallback(() => {
    // hard reload only will help here
    window.location.reload();
  }, []);

  if (isError) {
    return (
      <Layout menu={<DashboardMenu />}>
        <PageError onRetry={handleRetry} />
      </Layout>
    );
  }

  if (!countriesModel.isLoaded || !merchantFlowsModel.isLoaded || !countriesOnlyExistingModel.isLoaded) {
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
      <Footer />
    </Layout>,
  ];
}
