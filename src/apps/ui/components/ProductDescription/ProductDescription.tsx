import React from 'react';
import Box from '@material-ui/core/Box';
import { IProductCard } from 'models/Product.model';
import { useFormatMessage } from 'apps/intl';

export function ProductDescription({ card }: {
  card: IProductCard;
}) {
  const formatMessage = useFormatMessage();
  return (
    <Box color="common.black75" mb={1}>
      {formatMessage(`${card.id}.card.description`)}
    </Box>
  );
}
