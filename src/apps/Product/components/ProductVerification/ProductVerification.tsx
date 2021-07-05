import { selectNewVerificationWithExtras } from 'apps/Verification';
import { Product } from 'models/Product.model';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductVerification({ productId }) {
  const product: Product = useMemo(() => productManagerService.getProduct(productId), [productId]);
  const verificationWithExtra = useSelector(selectNewVerificationWithExtras);
  const data = useMemo(() => product?.getVerification(verificationWithExtra), [product, verificationWithExtra]);

  if (!product) {
    return null;
  }

  return React.createElement<any>(product.componentVerification, {
    data,
  });
}
