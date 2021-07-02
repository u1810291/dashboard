import { selectFlowBuilderChangeableFlow, selectFlowBuilderIntegrationType } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { productManagerService } from 'apps/Product/services/ProductManager.service';
import { ProductTypes } from 'models/Product.model';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function useProductsIssues(products: ProductTypes[]) {
  const changeableFlow = useSelector(selectFlowBuilderChangeableFlow);
  const integrationType = useSelector(selectFlowBuilderIntegrationType);

  return useMemo(() => products.some((productType) => productManagerService.getProduct(productType).haveIssues(changeableFlow, integrationType)), [integrationType, products, changeableFlow]);
}
