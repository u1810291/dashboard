import { IProductCard, Product, ProductTypes } from 'models/Product.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import React, { useMemo } from 'react';
import { UIProductTab } from 'apps/ui';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductTab({ id, isSelected, onSelect, verification }: {
  id: ProductTypes;
  isSelected: boolean;
  onSelect: (id: ProductTypes) => void;
  verification: VerificationResponse | IVerificationWorkflow;
}) {
  const product: Product = useMemo(() => productManagerService.getProduct(id), [id]);
  const isFailed = useMemo(() => product?.hasFailedCheck(verification as any), [product, verification]);
  const card: IProductCard = useMemo(() => product?.getCard(), [product]);

  if (!product || !card || !product.isInVerification(verification as any)) {
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
