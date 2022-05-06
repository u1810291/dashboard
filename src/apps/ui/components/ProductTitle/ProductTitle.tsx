import React, { useMemo } from 'react';
import { Box, Grid } from '@material-ui/core';
import { CircledContent, ProductCheckList } from 'apps/ui';
import { IProductCard } from 'models/Product.model';
import { useIntl } from 'react-intl';
import { useStyles } from './ProductTitle.styles';
import { ProductDescription } from '../ProductDescription/ProductDescription';

export function ProductTitle({ card }: {
  card: IProductCard;
}) {
  const classes = useStyles();
  const intl = useIntl();
  const { inputs, icon } = card;
  const inputList = useMemo(() => inputs.map((item) => intl.formatMessage({ id: `Product.userInput.${item}` })).join(', '), [intl, inputs]);
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
            {intl.formatMessage({ id: card.title })}
          </Box>
          <Box color="common.black75">
            {intl.formatMessage({ id: 'Product.card.usersInput' }, { inputs: inputList })}
          </Box>
        </Box>
      </Grid>
      <Box mt={2}>
        <ProductDescription card={card} />
        <ProductCheckList cards={[card]} />
      </Box>
    </Box>
  );
}
