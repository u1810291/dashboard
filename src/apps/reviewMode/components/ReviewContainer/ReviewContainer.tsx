import { Box, Grid, Typography } from '@material-ui/core';
import { useAfkListener } from 'apps/layout';
import { useOverlay } from 'apps/overlay';
import { useProduct } from 'apps/Product';
import { TimeoutModal } from 'apps/ui';
import { VerificationProductList } from 'apps/Verification';
import { ReactComponent as IconLoad } from 'assets/icon-load-dark.svg';
import { Routes } from 'models/Router.model';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ProductVerification } from 'apps/Product/components/ProductVerification/ProductVerification';
import { useDocsWithPrivateMedia, useBiometricsWithPrivateMedia } from 'apps/media';
import { VerificationWithExtras } from 'models/VerificationOld.model';
import { reviewVerificationClear, verificationSkip } from '../../state/reviewMode.actions';
import { selectReviewVerificationModelWithExtras, selectReviewVerificationWithExtras, selectVerificationProductList } from '../../state/reviewMode.selectors';
import { useStyles } from './ReviewContainer.styles';

export function ReviewContainer() {
  useProduct();
  const classes = useStyles();
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>(null);
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const verification = useSelector(selectReviewVerificationWithExtras);
  const documentsWithPrivateMedia = useDocsWithPrivateMedia(verification?.documents, Routes.review.root);
  const biometricsWithPrivateMedia = useBiometricsWithPrivateMedia(verification?.biometric);
  const resultVerification = useMemo<VerificationWithExtras>(() => ({ ...verification, documents: documentsWithPrivateMedia, biometric: biometricsWithPrivateMedia }), [biometricsWithPrivateMedia, documentsWithPrivateMedia, verification]);
  const verificationModel = useSelector(selectReviewVerificationModelWithExtras);
  const productList = useSelector(selectVerificationProductList);
  const isActive = useAfkListener(600);
  const [createOverlay, closeOverlay] = useOverlay();

  const handleAFKExit = useCallback(() => {
    dispatch(verificationSkip());
    const backPath = history?.location?.state?.from || Routes.list.root;
    closeOverlay();
    history.push(backPath);
    dispatch(reviewVerificationClear());
  }, [closeOverlay, dispatch, history]);

  useEffect(() => {
    if (!selectedProduct || !productList.includes(selectedProduct)) {
      setSelectedProduct(productList[0]);
    }
  }, [productList, selectedProduct]);

  useEffect(() => {
    if (!isActive) {
      createOverlay(<TimeoutModal title={intl.formatMessage({ id: 'ReviewMode.timeoutMessage' })} onTimerEnd={handleAFKExit} timeoutSeconds={10} onClose={closeOverlay} />);
    }
  }, [closeOverlay, createOverlay, handleAFKExit, isActive, intl]);

  return (
    <>
      {verification && !verificationModel.isLoading && verificationModel.isLoaded ? (
        <Box className={classes.container}>
          <Grid container>
            <Grid item xs={12} lg={4} xl={2} className={classes.selector}>
              <VerificationProductList
                productList={productList}
                selectedId={selectedProduct}
                onSelect={setSelectedProduct}
              />
            </Grid>
            <Grid item xs={12} lg={8} xl={10} className={classes.products}>
              <Box p={2}>
                <ProductVerification isReviewMode productId={selectedProduct} verification={resultVerification} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box m="auto">
          <Grid container direction="column" alignItems="center">
            <IconLoad width={22} />
            <Box my={2} color="common.black75">
              <Typography variant="h4">{intl.formatMessage({ id: 'ReviewMode.noVerifications' })}</Typography>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
}
