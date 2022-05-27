import { useCallback, useState } from 'react';
import { ProductTypes } from 'models/Product.model';

export function useCrashedProducts(selectedProduct: ProductTypes): [(error: Error) => void, Map<ProductTypes, Error>] {
  const [productsWithError, setProductsWithError] = useState<Map<ProductTypes, Error>>(new Map());

  const handleError = useCallback((error: Error) => {
    setProductsWithError((prevState) => new Map(prevState.set(selectedProduct, error)));
  }, [selectedProduct]);

  return [handleError, productsWithError];
}
