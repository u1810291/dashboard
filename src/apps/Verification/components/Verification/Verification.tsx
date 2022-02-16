import { Box, Grid } from '@material-ui/core';
import { ProductTypes } from 'models/Product.model';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductVerification } from 'apps/Product/components/ProductVerification/ProductVerification';
import { useDocsWithPrivateMedia, useBiometricsWithPrivateMedia, useDownloadAllPrivateMedia } from 'apps/media';
import { Routes } from 'models/Router.model';
import { VerificationWithExtras } from 'models/Verification.model';
import { ErrorMessages, isInReviewModeError } from 'models/Error.model';
import { notification } from 'apps/ui';
import { selectVerificationProductList, selectNewVerificationWithExtras, selectVerificationModelError } from '../../state/Verification.selectors';
import { VerificationProductList } from '../VerificationProductList/VerificationProductList';
import { useStyles } from './Verification.styles';

export function Verification() {
  const productList = useSelector(selectVerificationProductList);
  const verificationWithExtra = useSelector(selectNewVerificationWithExtras);
  const verificationError = useSelector(selectVerificationModelError);
  const documentsWithPrivateMedia = useDocsWithPrivateMedia(verificationWithExtra?.documents, Routes.identity.profile.root);
  const biometricsWithPrivateMedia = useBiometricsWithPrivateMedia(verificationWithExtra?.biometric);
  // TODO: @all wrong desing, we don't mutate backend data on fly
  const stepsWithPrivateMedia = useDownloadAllPrivateMedia(verificationWithExtra?.steps);
  const verificationWithPrivateMedia = useMemo<VerificationWithExtras>(() => ({ ...verificationWithExtra, steps: stepsWithPrivateMedia, documents: documentsWithPrivateMedia, biometric: biometricsWithPrivateMedia }), [biometricsWithPrivateMedia, documentsWithPrivateMedia, stepsWithPrivateMedia, verificationWithExtra]);
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!selectedProduct || !productList.includes(selectedProduct)) {
      setSelectedProduct(productList[0]);
    }
  }, [productList, selectedProduct]);

  useEffect(() => {
    if (verificationError) {
      if (isInReviewModeError(verificationError)) {
        notification.error(ErrorMessages.IN_REVIEW_MODE_ERROR, { autoClose: false });
      } else {
        notification.error(ErrorMessages.ERROR_COMMON);
      }
    }
  }, [verificationError]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} lg={4} xl={2} className={classes.selector}>
        <VerificationProductList
          selectedId={selectedProduct}
          onSelect={setSelectedProduct}
        />
      </Grid>
      <Grid item xs={12} lg={8} xl={10} className={classes.products}>
        <Box p={2}>
          <ProductVerification productId={selectedProduct} verification={verificationWithPrivateMedia} />
        </Box>
      </Grid>
    </Grid>
  );
}
