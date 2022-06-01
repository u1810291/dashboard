import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { ProductTypes } from 'models/Product.model';
import React, { useEffect, useMemo, useState } from 'react';
import { ProductVerification } from 'apps/Product/components/ProductVerification/ProductVerification';
import { useDocsWithPrivateMedia, useBiometricsWithPrivateMedia, useDownloadAllPrivateMedia } from 'apps/media';
import { Routes } from 'models/Router.model';
import { VerificationWithExtras } from 'models/VerificationOld.model';
import { VerificationProductList } from 'apps/Verification';
import { ErrorCatch, ProductErrorPlaceholder } from 'apps/Error';
import { useCrashedProducts } from 'apps/Product';
import { useStyles } from './VerificationOld.styles';

export function VerificationOld({ verification, productList }: {
  verification: VerificationWithExtras;
  productList: ProductTypes[];
}) {
  const documentsWithPrivateMedia = useDocsWithPrivateMedia(verification?.documents, Routes.identity.profile.root);
  const biometricsWithPrivateMedia = useBiometricsWithPrivateMedia(verification?.biometric);
  // TODO: @all wrong desing, we don't mutate backend data on fly
  const stepsWithPrivateMedia = useDownloadAllPrivateMedia(verification?.steps);
  const verificationWithPrivateMedia = useMemo<VerificationWithExtras>(() => ({ ...verification, steps: stepsWithPrivateMedia, documents: documentsWithPrivateMedia, biometric: biometricsWithPrivateMedia }), [biometricsWithPrivateMedia, documentsWithPrivateMedia, stepsWithPrivateMedia, verification]);
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>(null);
  const [onError, productsWithError] = useCrashedProducts(selectedProduct);
  const classes = useStyles();

  useEffect(() => {
    if (!selectedProduct || !productList.includes(selectedProduct)) {
      setSelectedProduct(productList[0]);
    }
  }, [productList, selectedProduct]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} lg={4} xl={2} className={classes.selector}>
        <VerificationProductList
          productList={productList}
          selectedId={selectedProduct}
          onSelect={setSelectedProduct}
          verification={verificationWithPrivateMedia}
          crashedProducts={productsWithError}
        />
      </Grid>
      <Grid item xs={12} lg={8} xl={10} className={classes.products}>
        <Box p={2}>
          <ErrorCatch onError={onError}>
            {!productsWithError.has(selectedProduct) ? (
              <ProductVerification productId={selectedProduct} verification={verificationWithPrivateMedia} />
            ) : (
              <ProductErrorPlaceholder />
            )}
          </ErrorCatch>
        </Box>
      </Grid>
    </Grid>
  );
}
