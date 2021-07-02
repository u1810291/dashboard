import { IProductCard, Product, ProductTypes } from 'models/Product.model';
import React, { useMemo } from 'react';
import { UIProductTab } from 'apps/ui';
import { useSelector } from 'react-redux';
import { selectVerificationModel } from 'apps/Verification';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductTab({ id, isSelected, onSelect }: {
  id: ProductTypes;
  isSelected: boolean;
  onSelect: (id: ProductTypes) => void;
}) {
  const product: Product = useMemo(() => productManagerService.getProduct(id), [id]);
  const { value: verification } = useSelector(selectVerificationModel);
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
