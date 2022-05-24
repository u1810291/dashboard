import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { CircledContent, ProductCheckList } from 'apps/ui';
import { IProductCard } from 'models/Product.model';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './ProductTitle.styles';
import { ProductDescription } from '../ProductDescription/ProductDescription';

export function ProductTitle({ card, hasDescription }: {
  card: IProductCard;
  hasDescription?: boolean;
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const { inputs, icon } = card;
  const inputList = useMemo(() => inputs.map((item) => formatMessage(`Product.userInput.${item}`)).join(', '), [formatMessage, inputs]);

  return (
    <Box>
      <Grid container wrap="nowrap" alignItems="center">
        <Box className={classes.image}>
          <CircledContent>
            {icon && icon({})}
          </CircledContent>
        </Box>
        <Box ml={1}>
          <Box className={classes.title}>
            {formatMessage(card.title)}
          </Box>
          <Box color="common.black75">
            {formatMessage('Product.card.usersInput', { messageValues: { inputs: inputList } })}
          </Box>
        </Box>
      </Grid>
      <Box mt={2}>
        {hasDescription && (
          <ProductDescription card={card} />
        )}
        <ProductCheckList cards={[card]} />
      </Box>
    </Box>
  );
}
