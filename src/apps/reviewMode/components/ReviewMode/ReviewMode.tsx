import { MuiThemeProvider } from '@material-ui/core/styles';
import { DashboardMenu } from 'apps/dashboard/components/DashboardMenu/DashboardMenu';
import { Layout, PageError } from 'apps/layout';
import { selectIsNoVerifications, selectReviewAwaitingCountModel, selectReviewIsLoadingNext, selectVerificationModel } from 'apps/reviewMode/state/reviewMode.selectors';
import { AppDarkTheme } from 'apps/theme/appDark.theme';
import { Loader } from 'apps/ui';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useLongPolling } from 'lib/longPolling.hook';
import { Loadable } from 'models/Loadable.model';
import { VerificationResponse } from 'models/Verification.model';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { goToStartPage } from 'lib/url';
import { ReviewModeRouter } from '../../ReviewMode.router';
import { reviewAwaitingCountLoad, verificationLoad } from '../../state/reviewMode.actions';
import { ReviewModeLayout } from '../ReviewModeLayout/ReviewModeLayout';

export function ReviewMode() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const verificationModel: Loadable<VerificationResponse> = useSelector(selectVerificationModel);
  const reviewAwaitingCountModel: Loadable<number> = useSelector(selectReviewAwaitingCountModel);
  const isLoadingNext: boolean = useSelector(selectReviewIsLoadingNext);
  const isNoVerifications: boolean = useSelector(selectIsNoVerifications);
  const [isLongPolling, setIsLongPolling] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handlePolling = useCallback(async () => {
    if (isNoVerifications) {
      try {
        setIsLongPolling(true);
        await dispatch(verificationLoad());
        await dispatch(reviewAwaitingCountLoad());
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    }
    setIsLongPolling(false);
  }, [dispatch, isNoVerifications]);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(verificationModel)) {
        try {
          dispatch(verificationLoad());
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      }
    };
    loadData();
  }, [dispatch, verificationModel]);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(reviewAwaitingCountModel)) {
        try {
          dispatch(reviewAwaitingCountLoad());
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      }
    };

    loadData();
  }, [dispatch, reviewAwaitingCountModel]);

  useLongPolling(handlePolling, 3000, {
    isCheckMerchantTag: false,
    isUseFirstInvoke: false,
  });

  if (isError) {
    return (
      <Layout menu={<DashboardMenu />}>
        <PageError onRetry={goToStartPage} />
      </Layout>
    );
  }

  return [
    <Helmet key="head">
      <title>{intl.formatMessage({ id: 'page.title' })}</title>
    </Helmet>,
    <MuiThemeProvider theme={AppDarkTheme} key="app">
      <ReviewModeLayout>
        {!isLongPolling && (isLoadingNext || !verificationModel.isLoaded) && (
          <Loader logoWithCompanyName />
        )}
        <ReviewModeRouter />
      </ReviewModeLayout>
    </MuiThemeProvider>,
  ];
}
