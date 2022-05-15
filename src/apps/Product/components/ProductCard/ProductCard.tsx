import { selectFlowBuilderChangeableFlow, selectFlowBuilderProductsInGraph } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { UIProductCard } from 'apps/ui';
import { IProductCard, ProductTypes } from 'models/Product.model';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductCard({ id, isIssues = false, isControls = false, isExpandable = true, defaultExpanded = false, onSelect, onRemove }: {
  id: ProductTypes;
  isIssues?: boolean;
  isControls?: boolean;
  isExpandable?: boolean;
  defaultExpanded?: boolean;
  onSelect?: (id: ProductTypes) => void;
  onRemove?: (id: ProductTypes) => void;
}) {
  const flow = useSelector(selectFlowBuilderChangeableFlow);
  const productsInGraph = useSelector(selectFlowBuilderProductsInGraph);

  const card: IProductCard = useMemo(() => {
    const product = productManagerService.getProduct(id);
    return product.getCard();
  }, [id]);

  const handleOpen = useCallback(() => {
    if (isControls) onSelect(id);
  }, [id, onSelect, isControls]);

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  const issuesComponent = useMemo(() => (isIssues && productManagerService.getProduct(id).getIssuesComponent(flow, productsInGraph)), [flow, productsInGraph, isIssues, id]);
  return (
    <UIProductCard
      card={card}
      issuesComponent={issuesComponent && React.createElement(issuesComponent, {})}
      isControls={isControls}
      isExpandable={isExpandable}
      defaultExpanded={defaultExpanded}
      onOpen={handleOpen}
      onRemove={handleRemove}
    />
  );
}
