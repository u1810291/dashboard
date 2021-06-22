import { Box } from '@material-ui/core';
import { FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY } from 'models/DragAndDrop.model';
import { selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { selectProductCards } from 'apps/Product';
import { UIProductCard } from 'apps/ui';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ProductTypes } from 'models/Product.model';
import { useStyles } from './ProductListSidebar.styles';

export function ProductListSidebar() {
  const classes = useStyles();
  const cards = useSelector(selectProductCards);
  const productsInGraph = useSelector(selectFlowBuilderProductsInGraphModel);
  const intl = useIntl();

  // TODO @dkchv: !!! move to selectors
  const cardsNotInFlow = useMemo(() => cards.filter((card) => productsInGraph.value.every((type) => type !== card.id)), [productsInGraph, cards]);

  const handleDragStart = useCallback((productId: ProductTypes) => (event) => {
    event.dataTransfer.setData(FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY, productId);
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <Box className={classes.container}>
      <Box p={2} fontWeight="bold" color="common.black90">
        {intl.formatMessage({ id: 'FlowBuilder.products' })}
      </Box>
      <Box px={2} pt={0} pb={1} className={classes.list}>
        {cardsNotInFlow.map((productCard) => (
          <div key={productCard.id} onDragStart={handleDragStart(productCard.id)} draggable>
            <Box mb={1}>
              <UIProductCard card={productCard} />
            </Box>
          </div>
        ))}
      </Box>
    </Box>
  );
}
