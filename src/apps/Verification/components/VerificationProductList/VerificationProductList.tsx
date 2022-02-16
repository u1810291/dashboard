import { Box } from '@material-ui/core';
import { ProductTab } from 'apps/Product';
import { selectVerificationModel } from 'apps/Verification';
import { Loadable } from 'models/Loadable.model';
import { VerificationResponse } from 'models/Verification.model';
import { ProductTypes } from 'models/Product.model';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectVerificationProductList } from '../../state/Verification.selectors';

export function VerificationProductList({ onSelect, selectedId }: {
  onSelect: (product: ProductTypes) => void;
  selectedId?: ProductTypes;
}) {
  const productList: ProductTypes[] = useSelector(selectVerificationProductList);
  const primaryProductList = useMemo(() => productList.filter((id) => id !== ProductTypes.Metadata), [productList]);
  const verification: Loadable<VerificationResponse> = useSelector(selectVerificationModel);

  return (
    <Box p={2}>
      <Box mb={{ xs: 1, lg: 5 }}>
        {primaryProductList.map((item) => (
          <ProductTab
            key={item}
            id={item}
            isSelected={selectedId === item}
            onSelect={onSelect}
            verification={verification.value}
          />
        ))}
        <Box mt={3}>
          <ProductTab
            id={ProductTypes.Metadata}
            isSelected={selectedId === ProductTypes.Metadata}
            onSelect={onSelect}
            verification={verification.value}
          />
        </Box>
      </Box>
    </Box>
  );
}
