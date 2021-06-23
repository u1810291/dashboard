import { UIProductCard } from 'apps/ui';
import { IProductCard, ProductTypes } from 'models/Product.model';
import React, { useCallback, useMemo } from 'react';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductCard({ id, isControls = false, onSelect, onRemove }: {
  id: ProductTypes,
  isControls?: boolean;
  onSelect?: (id: ProductTypes) => void;
  onRemove?: (id: ProductTypes) => void,
}) {
  const card: IProductCard = useMemo(() => {
    const product = productManagerService.getProduct(id);
    return product.getCard();
  }, [id]);

  const handleOpen = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id]);

  return (
    <UIProductCard
      card={card}
      isControls={isControls}
      onOpen={handleOpen}
      onRemove={handleRemove}
    />
  );
}
