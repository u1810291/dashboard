import { Box } from '@material-ui/core';
import { IFlow } from 'models/Flow.model';
import { Product, ProductSettingsProps, ProductTypes } from 'models/Product.model';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectFlowBuilderProductsInGraph } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { ProductTitle } from 'apps/ui';
import { DeepPartial } from 'lib/object';
import { productManagerService } from '../../services/ProductManager.service';

export function ProductSettings<Flow = IFlow>({ flow, productId, onUpdate }: {
  flow: Flow;
  productId: ProductTypes;
  onUpdate: (patch: DeepPartial<Flow>) => void;
}) {
  const productsInGraph = useSelector(selectFlowBuilderProductsInGraph);

  const product: Product<Flow> = useMemo(() => productManagerService.getProduct(productId), [productId]);
  const settings = useMemo(() => product.parser(flow, productsInGraph), [product, flow, productsInGraph]);
  // TODO @dkchv: !!! review again
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const card = useMemo(() => product.getCard(), [product, flow]);

  const handleUpdate = useCallback((newSettings: any) => {
    onUpdate(product.serialize(newSettings));
  }, [product, onUpdate]);

  const settingsEl = useMemo(() => React.createElement<ProductSettingsProps>(product.component, {
    settings,
    onUpdate: handleUpdate,
  }), [product, settings, handleUpdate]);

  if (!product.component) {
    return null;
  }

  return (
    <Box>
      <Box mb={2}>
        <ProductTitle card={card} />
      </Box>
      <Box>
        {settingsEl}
      </Box>
    </Box>
  );
}
