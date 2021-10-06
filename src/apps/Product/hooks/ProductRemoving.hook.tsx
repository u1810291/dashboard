import { selectFlowBuilderChangeableFlow, selectFlowBuilderProductsInGraph } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { useOverlay } from 'apps/overlay';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { productManagerService } from '../services/ProductManager.service';
import { ProductDependencyModal } from '../components/ProductDependencyModal/ProductDependencyModal';
import { ProductCard } from '../components/ProductCard/ProductCard';

export function useProductRemoving() {
  const [createOverlay, closeOverlay] = useOverlay();
  const intl = useIntl();
  const productsInGraph = useSelector(selectFlowBuilderProductsInGraph);
  const flow = useSelector(selectFlowBuilderChangeableFlow);

  return useCallback((productType: ProductTypes, onRemove: (productType: ProductTypes) => void) => {
    const removingAlertComponent = productManagerService.getProduct(productType)?.getRemovingAlertComponent(flow, productsInGraph);
    const { dependentProductTypes } = productManagerService.getProduct(productType).getCard();
    const activeDependentProductTypes = dependentProductTypes.filter((dependentProductType) => productsInGraph.some((productInGraph) => productInGraph === dependentProductType));
    const isMoreThanOneDepProduct = activeDependentProductTypes.length === 2;

    const handleConfirm = () => {
      activeDependentProductTypes.forEach((dependentProductType) => {
        onRemove(dependentProductType);
      });
      onRemove(productType);
      closeOverlay();
    };

    if (activeDependentProductTypes.length > 0 || removingAlertComponent) {
      createOverlay(
        <ProductDependencyModal
          title={intl.formatMessage({ id: 'FlowBuilder.removingProductModal.title' })}
          leftSubtitle={intl.formatMessage({ id: 'FlowBuilder.removingProductModal.removedProductTitle' })}
          leftComponent={<ProductCard id={productType} isExpandable={false} defaultExpanded />}
          rightSubtitle={!removingAlertComponent && intl.formatMessage({ id: `FlowBuilder.removingProductModal.${isMoreThanOneDepProduct ? 'dependentProductsTitle' : 'dependentProductTitle'}` })}
          rightComponent={removingAlertComponent
            ? React.createElement(removingAlertComponent, {})
            : activeDependentProductTypes.map((dependentProductType) => (
              <ProductCard isExpandable={false} defaultExpanded={!isMoreThanOneDepProduct} key={dependentProductType} id={dependentProductType} />
            ))}
          confirmText={intl.formatMessage({ id: `FlowBuilder.removingProductModal.${isMoreThanOneDepProduct ? 'confirmBoth' : 'confirm'}` })}
          onClose={closeOverlay}
          onConfirm={handleConfirm}
          variant="Red"
        />,
      );
    } else {
      onRemove(productType);
    }
  }, [createOverlay, closeOverlay, intl, productsInGraph, flow]);
}
