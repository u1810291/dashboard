import { Paper } from '@material-ui/core';
import { useProduct } from 'apps/Product';
import { VerificationErrorTypes } from 'models/Verification.model';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Placeholder } from 'apps/ui';
import { ReactComponent as UserDeletedIcon } from 'assets/profile-pic-round.svg';
import { useIntl } from 'react-intl';
import { PageError, PageLoader } from 'apps/layout';
import { goToStartPage, useQuery } from 'lib/url';
import { selectVerificationModel } from '../../state/Verification.selectors';
import { verificationClear, verificationLoad } from '../../state/Verification.actions';
import { Verification } from '../Verification/Verification';
import { VerificationHeaderMenu } from '../VerificationHeaderMenu/VerificationHeaderMenu';
import { useStyles } from './VerificationContainer.styles';

export function VerificationContainer() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { verificationId } = useParams();
  const { asMerchantId } = useQuery();
  const classes = useStyles();
  const [errorType, setErrorType] = useState<VerificationErrorTypes>(null);
  const verificationModel = useSelector(selectVerificationModel);

  useProduct();

  useEffect(() => {
    const loadData = async () => {
      if (!verificationId) {
        return;
      }

      try {
        await dispatch(verificationLoad(verificationId, asMerchantId));
        setErrorType(null);
      } catch (error) {
        if ((error as any)?.response?.status === 404) {
          setErrorType(VerificationErrorTypes.VerificationNotFound);
        } else {
          setErrorType(VerificationErrorTypes.RequestError);
        }
        console.error(error);
      }
    };

    loadData();

    // eslint-disable-next-line consistent-return
    return () => {
      dispatch(verificationClear());
    };
  }, [dispatch, asMerchantId, verificationId]);

  if (errorType === VerificationErrorTypes.VerificationNotFound) {
    return <Paper className={classes.placeholder}><Placeholder icon={<UserDeletedIcon />} subtitle={intl.formatMessage({ id: 'Verification.error.notFound' })} /></Paper>;
  }

  if (errorType === VerificationErrorTypes.RequestError) {
    return <PageError onRetry={goToStartPage} />;
  }

  if (verificationModel.isLoading) {
    return <PageLoader />;
  }

  if (!verificationModel.value) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <VerificationHeaderMenu />
      <Verification />
    </Paper>
  );
}
