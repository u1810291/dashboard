import { Product, ProductTypes } from 'models/Product.model';
import React, { useMemo } from 'react';
import { VerificationResponse } from 'models/Verification.model';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductVerification({
  productId,
  verification,
}: {
  productId: ProductTypes;
  verification: VerificationResponse;
}) {
  const product: Product = useMemo(() => productManagerService.getProduct(productId), [productId]);
  const data = useMemo(() => product?.getVerification(verification), [product, verification]);

  if (!product) {
    return null;
  }

  return React.createElement<any>(product.componentVerification, {
    data,
  });
}
