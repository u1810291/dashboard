import { IProductCard, Product, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import React, { useMemo } from 'react';
import { UIProductTab } from 'apps/ui';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductTab({ id, isSelected, onSelect, verification }: {
  id: ProductTypes;
  isSelected: boolean;
  onSelect: (id: ProductTypes) => void;
  verification: VerificationResponse;
}) {
  const product: Product = useMemo(() => productManagerService.getProduct(id), [id]);
  const isFailed = useMemo(() => product?.hasFailedCheck(verification), [product, verification]);
  const card: IProductCard = useMemo(() => product?.getCard(), [product]);

  if (!product || !card || !product.isInVerification(verification)) {
    return null;
  }

  return (
    <UIProductTab
      card={card}
      onSelect={onSelect}
      isSelected={isSelected}
      hasBadge={isFailed}
    />
  );
}
