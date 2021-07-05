import { Box } from '@material-ui/core';
import { ProductTab } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectVerificationProductList } from '../../state/Verification.selectors';

export function VerificationProductList({ onSelect, selectedId }: {
  onSelect: (product: ProductTypes) => void;
  selectedId?: ProductTypes;
}) {
  const productList = useSelector(selectVerificationProductList);

  return (
    <Box p={2}>
      <Box mb={{ xs: 1, lg: 5 }}>
        {productList.map((item) => (
          <ProductTab
            key={item}
            id={item}
            isSelected={selectedId === item}
            onSelect={onSelect}
          />
        ))}
        <Box mt={3}>
          <ProductTab id={ProductTypes.Metadata} isSelected={selectedId === ProductTypes.Metadata} onSelect={onSelect} />
        </Box>
      </Box>
    </Box>
  );
}
