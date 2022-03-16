import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import { selectIdentityProfile } from 'apps/IdentityProfileOld';
import { PageError, PageLoader } from 'apps/layout';
import { useProduct } from 'apps/Product';
import { Placeholder } from 'apps/ui';
import { ProductTypes } from 'models/Product.model';
import { VerificationErrorTypes } from 'models/VerificationOld.model';
import { ReactComponent as UserDeletedIcon } from 'assets/profile-pic-round.svg';
import { goToStartPage, useQuery } from 'lib/url';
import { selectNewVerificationWithExtras, selectVerificationModel, selectVerificationProductList } from '../../state/VerificationOld.selectors';
import { verificationClear, verificationLoad } from '../../state/VerificationOld.actions';
import { VerificationHeaderMenuOld } from '../VerificationHeaderMenuOld/VerificationHeaderMenuOld';
import { VerificationOld } from '../VerificationOld/VerificationOld';
import { useStyles } from './VerificationContainerOld.styles';

export function VerificationContainerOld() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { verificationId } = useParams();
  const { asMerchantId } = useQuery();
  const classes = useStyles();
  const [errorType, setErrorType] = useState<VerificationErrorTypes>(null);
  const verificationModel = useSelector(selectVerificationModel);
  const verificationWithExtras = useSelector(selectNewVerificationWithExtras);
  const productList: ProductTypes[] = useSelector(selectVerificationProductList);
  // TODO: @ggrigorev identity isn't really needed here. Change VerificationHeaderMenu to work with Verification data only
  const identity = useSelector(selectIdentityProfile);

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

  if (verificationModel.isLoading && !verificationModel.isLoaded) {
    return <PageLoader />;
  }

  if (!verificationModel.value) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <VerificationHeaderMenuOld verification={verificationWithExtras} identity={identity} />
      <VerificationOld verification={verificationWithExtras} productList={productList} />
    </Paper>
  );
}
