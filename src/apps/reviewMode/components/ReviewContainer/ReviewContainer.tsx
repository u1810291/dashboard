import { Box, Grid, Typography } from '@material-ui/core';
import { useAFKListener } from 'apps/layout/hooks/AFKListener';
import { useOverlay } from 'apps/overlay';
import { useProduct } from 'apps/Product';
import { ReviewModeTimeoutModal } from 'apps/reviewMode/components/ReviewModeTimeoutModal/ReviewModeTimeoutModal';
import { ReactComponent as IconLoad } from 'assets/icon-load-dark.svg';
import { Routes } from 'models/Router.model';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reviewVerificationClear, verificationSkip } from '../../state/reviewMode.actions';
import { selectReviewVerificationModelWithExtras, selectReviewVerificationWithExtras, selectVerificationProductList } from '../../state/reviewMode.selectors';
import { ReviewModeProductList } from '../ReviewModeProductList/ReviewModeProductList';
import { useStyles } from './ReviewContainer.styles';
import { ProductVerification } from '../../../Product/components/ProductVerification/ProductVerification';

export function ReviewContainer() {
  useProduct();
  const classes = useStyles();
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>(null);
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const verification = useSelector(selectReviewVerificationWithExtras);
  const verificationModel = useSelector(selectReviewVerificationModelWithExtras);
  const productList = useSelector(selectVerificationProductList);
  const isActive = useAFKListener(600);
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
      createOverlay(<ReviewModeTimeoutModal onTimerEnd={handleAFKExit} timeoutSeconds={10} closeOverlay={closeOverlay} />);
    }
  }, [closeOverlay, createOverlay, handleAFKExit, isActive]);

  return (
    <>
      {verification && !verificationModel.isLoading && verificationModel.isLoaded ? (
        <Box className={classes.container}>
          <Grid container>
            <Grid item xs={12} lg={4} xl={2} className={classes.selector}>
              <ReviewModeProductList
                selectedId={selectedProduct}
                onSelect={setSelectedProduct}
              />
            </Grid>
            <Grid item xs={12} lg={8} xl={10} className={classes.products}>
              <Box p={2}>
                <ProductVerification isReviewMode productId={selectedProduct} verification={verification} />
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
