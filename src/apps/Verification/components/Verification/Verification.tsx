import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { ProductTypes } from 'models/Product.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import React, { useEffect, useState } from 'react';
import { ProductVerification } from 'apps/Product/components/ProductVerification/ProductVerification';
import { ErrorCatch, ProductErrorPlaceholder } from 'apps/Error';
import { useCrashedProducts } from 'apps/Product';
import { VerificationProductList } from '../VerificationProductList/VerificationProductList';
import { useStyles } from './Verification.styles';

export function Verification({ verification, productList }: {
  verification: IVerificationWorkflow;
  productList: ProductTypes[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>(null);
  const classes = useStyles();
  const [onError, productsWithError] = useCrashedProducts(selectedProduct);

  // TODO: @ggrigorev WF add privateMedia logic
  useEffect(() => {
    if (!selectedProduct || !productList.includes(selectedProduct)) {
      setSelectedProduct(productList[0]);
    }
  }, [productList, selectedProduct]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} lg={4} xl={2} className={classes.selector}>
        <VerificationProductList
          verification={verification}
          productList={productList}
          selectedId={selectedProduct}
          onSelect={setSelectedProduct}
          crashedProducts={productsWithError}
        />
      </Grid>
      <Grid item xs={12} lg={8} xl={10} className={classes.products}>
        <Box p={2}>
          <ErrorCatch onError={onError}>
            {!productsWithError.has(selectedProduct) ? (
              <ProductVerification productId={selectedProduct} verification={verification} />
            ) : (
              <ProductErrorPlaceholder />
            )}
          </ErrorCatch>
        </Box>
      </Grid>
    </Grid>
  );
}
