import { IFlow } from 'models/Flow.model';
import { Product, ProductConfig, ProductSettingsProps, ProductTypes } from 'models/Product.model';
import React, { useCallback, useMemo } from 'react';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductSettings({ flow, productId, onUpdate }: {
  flow: IFlow;
  productId: ProductTypes;
  onUpdate: Function;
}) {
  const product: Product = useMemo(() => productManagerService.getProduct(productId), [productId]);
  const settings = useMemo(() => product.parser(flow), [product, flow]);

  const handleUpdate = useCallback((newSettings: any) => {
    onUpdate(product.serialize(newSettings));
  }, [product, onUpdate]);

  return React.createElement<ProductSettingsProps<ProductConfig>>(product.component, {
    product,
    settings,
    onUpdate: handleUpdate,
  });
}
