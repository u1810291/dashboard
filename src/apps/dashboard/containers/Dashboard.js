import { signOut } from 'apps/auth/state/auth.actions';
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
import { selectClientIdModel, selectMerchantBusinessName, selectMerchantFlowsModel, selectMerchantModel } from 'state/merchant/merchant.selectors';
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
  const name = useSelector(selectMerchantBusinessName);

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
    if (merchantModel.isLoaded && LoadableAdapter.isPristine(merchantFlowsModel)) {
      dispatch(merchantFlowsLoad())
        .catch((error) => {
          setIsError(true);
          console.error(error);
        });
    }
  }, [dispatch, merchantFlowsModel, merchantModel]);

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

  // Beamer add user id
  useEffect(() => {
    /* eslint-disable camelcase */
    if (window?.beamer_config) {
      const user_id = clientIdModel?.value;
      const [user_firstname, user_lastname] = name?.split(' ') || [];
      window.beamer_config = {
        ...window.beamer_config,
        ...(user_id && { user_id }),
        ...(user_firstname && { user_firstname }),
        ...(user_lastname && { user_lastname }),
      };
    }
    /* eslint-enable camelcase */
  }, [clientIdModel, name]);

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

  if (!countriesModel.isLoaded && !merchantFlowsModel.isLoaded) {
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
