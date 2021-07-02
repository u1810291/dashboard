import { selectFlowBuilderProductsInGraph } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { useOverlay } from 'apps/overlay';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { productManagerService } from '../services/ProductManager.service';
import { ProductDependencyModal } from '../components/ProductDependencyModal/ProductDependencyModal';
import { ProductCard } from '../components/ProductCard/ProductCard';

export function useProductAdding() {
  const [createOverlay, closeOverlay] = useOverlay();
  const intl = useIntl();
  const productsInGraph = useSelector(selectFlowBuilderProductsInGraph);

  return useCallback((productType: ProductTypes, onAdd: (productType: ProductTypes) => void) => {
    const { requiredProductType } = productManagerService.getProduct(productType).getCard();

    const handleConfirm = () => {
      onAdd(productType);
      onAdd(requiredProductType);
      closeOverlay();
    };

    if (requiredProductType && productsInGraph.every((type) => type !== requiredProductType)) {
      createOverlay(
        <ProductDependencyModal
          title={intl.formatMessage({ id: 'FlowBuilder.addingProductModal.title' })}
          leftComponent={<ProductCard id={productType} isExpandable={false} defaultExpanded />}
          rightComponent={<ProductCard id={requiredProductType} isExpandable={false} defaultExpanded />}
          leftSubtitle={intl.formatMessage({ id: 'FlowBuilder.addingProductModal.dependentProductTitle' })}
          rightSubtitle={intl.formatMessage({ id: 'FlowBuilder.addingProductModal.requiredProductTitle' })}
          confirmText={intl.formatMessage({ id: 'FlowBuilder.addingProductModal.confirmBoth' })}
          onClose={closeOverlay}
          onConfirm={handleConfirm}
        />,
      );
    } else {
      onAdd(productType);
    }
  }, [createOverlay, closeOverlay, intl, productsInGraph]);
}
