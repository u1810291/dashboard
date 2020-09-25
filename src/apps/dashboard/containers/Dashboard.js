import { signOut } from 'apps/auth/state/auth.actions';
import { Layout, PageError } from 'apps/layout';
import { ROOT_PATH } from 'apps/routing';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCountries } from 'state/countries/countries.actions';
import { selectCountriesModel } from 'state/countries/countries.selectors';
import { merchantFlowsLoad, merchantLoad } from 'state/merchant/merchant.actions';
import { selectMerchantFlowsModel, selectMerchantModel } from 'state/merchant/merchant.selectors';
import { DashboardMenu } from '../components/DashboardMenu/DashboardMenu';
import { DashboardRouter } from './Dashboard.router';
import { Footer } from '../components/Footer/Footer';
import { Loader } from '../components/Loader/Loader';
import { DashboardLoader } from '../components/DashboardLoader/DashboardLoader';

export function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const merchantModel = useSelector(selectMerchantModel);
  const merchantFlowsModel = useSelector(selectMerchantFlowsModel);
  const countriesModel = useSelector(selectCountriesModel);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(merchantModel)) {
        await dispatch(merchantLoad())
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              dispatch(signOut());
              history.push(ROOT_PATH);
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
        await dispatch(getCountries())
          .catch((error) => {
            setIsError(true);
            console.error(error);
          });
      }
    };
    loadData();
  }, [dispatch, countriesModel]);

  useEffect(() => {
    if (merchantModel.isLoaded && LoadableAdapter.isPristine(merchantFlowsModel)) {
      dispatch(merchantFlowsLoad())
        .catch((error) => {
          setIsError(true);
          console.error(error);
        });
    }
  }, [dispatch, merchantFlowsModel, merchantModel]);

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
