import { Box, Grid } from '@material-ui/core';
import { ProductTypes } from 'models/Product.model';
import React, { useEffect, useState } from 'react';
import { ProductVerification } from 'apps/Product/components/ProductVerification/ProductVerification';
import { VerificationWithExtras } from 'models/VerificationOld.model';
import { VerificationProductList } from 'apps/Verification';
import { useStyles } from './VerificationOld.styles';

export function VerificationOld({ verification, productList }: {
  verification: VerificationWithExtras;
  productList: ProductTypes[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>(null);
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
          verification={verification}
        />
      </Grid>
      <Grid item xs={12} lg={8} xl={10} className={classes.products}>
        <Box p={2}>
          <ProductVerification productId={selectedProduct} verification={verification} />
        </Box>
      </Grid>
    </Grid>
  );
}
