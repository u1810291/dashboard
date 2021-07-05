import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useOverlay } from 'apps/overlay';
import { useIntl } from 'react-intl';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { ProductDependencyModal } from '../components/ProductDependencyModal/ProductDependencyModal';

export function useOtherProductAdding() {
  const [createOverlay, closeOverlay] = useOverlay();
  const intl = useIntl();

  return useCallback((productType: ProductTypes, rightComponent: React.ReactNode, onAdd: (productType: ProductTypes) => void) => {
    const handleConfirm = () => {
      onAdd(productType);
      closeOverlay();
    };

    createOverlay(
      <ProductDependencyModal
        title={intl.formatMessage({ id: 'FlowBuilder.addingProductModal.title' })}
        leftSubtitle={intl.formatMessage({ id: 'FlowBuilder.addingProductModal.appendedProductTitle' })}
        leftComponent={<ProductCard id={productType} isExpandable={false} defaultExpanded />}
        rightComponent={rightComponent}
        confirmText={intl.formatMessage({ id: 'FlowBuilder.addingProductModal.confirm' })}
        onClose={closeOverlay}
        onConfirm={handleConfirm}
      />,
    );
  }, [createOverlay, closeOverlay, intl]);
}
