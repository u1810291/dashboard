import { Paper } from '@material-ui/core';
import { useProduct } from 'apps/Product';
import { Routes } from 'models/Router.model';
import { VerificationErrorTypes } from 'models/Verification.model';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Placeholder } from 'apps/ui';
import { ReactComponent as UserDeletedIcon } from 'assets/profile-pic-round.svg';
import { useIntl } from 'react-intl';
import { PageError } from 'apps/layout';
import { goToStartPage } from 'lib/url';
import { verificationClear, verificationLoad } from '../../state/Verification.actions';
import { Verification } from '../Verification/Verification';
import { VerificationHeaderMenu } from '../VerificationHeaderMenu/VerificationHeaderMenu';
import { useStyles } from './VerificationContainer.styles';

export function VerificationContainer() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const { identityId, verificationId } = useParams();
  const classes = useStyles();
  const [errorType, setErrorType] = useState<VerificationErrorTypes>(null);

  useProduct();

  useEffect(() => {
    const loadData = async () => {
      if (!identityId || !verificationId) {
        return;
      }

      try {
        await dispatch(verificationLoad(verificationId));
        setErrorType(null);
      } catch (error) {
        if (error?.response?.status === 404) {
          setErrorType(VerificationErrorTypes.VerificationNotFound);
        } else {
          setErrorType(VerificationErrorTypes.RequestError);
        }
        console.error(error);
      }
    };

    loadData();

    return () => {
      if (!history.location.pathname.includes(Routes.identity.verification.root)) {
        dispatch(verificationClear());
      }
    };
  }, [dispatch, history.location.pathname, identityId, verificationId]);

  if (errorType === VerificationErrorTypes.VerificationNotFound) {
    return <Paper className={classes.placeholder}><Placeholder icon={<UserDeletedIcon />} subtitle={intl.formatMessage({ id: 'Verification.error.notFound' })} /></Paper>;
  }

  if (errorType === VerificationErrorTypes.RequestError) {
    return <PageError onRetry={goToStartPage} />;
  }

  return (
    <Paper className={classes.paper}>
      <VerificationHeaderMenu />
      <Verification />
    </Paper>
  );
}
