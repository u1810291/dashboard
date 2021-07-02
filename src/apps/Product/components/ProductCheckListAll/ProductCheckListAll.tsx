import { Box } from '@material-ui/core';
import { ProductCheckList } from 'apps/ui';
import { ProductTypes } from 'models/Product.model';
import React, { useMemo } from 'react';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductCheckListAll({ productList }: {
  productList?: ProductTypes[];
}) {
  const productCardList = useMemo(() => productList.map((item) => {
    const product = productManagerService.getProduct(item);
    return product.getCard();
  }), [productList]);

  return (
    <Box>
      {productCardList.map((item) => (
        <ProductCheckList
          key={item.id}
          checks={item.checks}
          productId={item.id}
          isForceFlat
        />
      ))}
    </Box>
  );
}
