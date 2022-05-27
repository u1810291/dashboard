import { Box } from '@material-ui/core';
import { ProductTab } from 'apps/Product';
import { IVerificationWorkflow } from 'models/Verification.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { ProductTypes } from 'models/Product.model';
import React, { useMemo } from 'react';

export function VerificationProductList({ productList, onSelect, selectedId, verification, crashedProducts }: {
  productList: ProductTypes[];
  onSelect: (product: ProductTypes) => void;
  selectedId?: ProductTypes;
  verification: VerificationResponse | IVerificationWorkflow;
  crashedProducts?: Map<ProductTypes, Error>;
}) {
  const primaryProductList = useMemo(() => productList.filter((id) => id !== ProductTypes.Metadata), [productList]);

  return (
    <Box p={2}>
      <Box mb={{ xs: 1, lg: 5 }}>
        {primaryProductList.map((item) => (
          <ProductTab
            key={item}
            id={item}
            isSelected={selectedId === item}
            onSelect={onSelect}
            verification={verification}
            isDisabled={crashedProducts?.has(item)}
          />
        ))}
        <Box mt={3}>
          <ProductTab
            id={ProductTypes.Metadata}
            isSelected={selectedId === ProductTypes.Metadata}
            onSelect={onSelect}
            verification={verification}
            isDisabled={crashedProducts?.has(ProductTypes.Metadata)}
          />
        </Box>
      </Box>
    </Box>
  );
}
