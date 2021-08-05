import { Box, Grid } from '@material-ui/core';
import { ProductTypes } from 'models/Product.model';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductVerification } from 'apps/Product/components/ProductVerification/ProductVerification';
import { selectVerificationProductList, selectNewVerificationWithExtras } from '../../state/Verification.selectors';
import { VerificationProductList } from '../VerificationProductList/VerificationProductList';
import { useStyles } from './Verification.styles';

export function Verification() {
  const productList = useSelector(selectVerificationProductList);
  const verificationWithExtra = useSelector(selectNewVerificationWithExtras);
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
          selectedId={selectedProduct}
          onSelect={setSelectedProduct}
        />
      </Grid>
      <Grid item xs={12} lg={8} xl={10} className={classes.products}>
        <Box p={2}>
          <ProductVerification productId={selectedProduct} verification={verificationWithExtra} />
        </Box>
      </Grid>
    </Grid>
  );
}
