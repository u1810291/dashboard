import { List, ListItem } from '@material-ui/core';
import { ProductCheck, ProductTypes } from 'models/Product.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { ProductCheckStatus } from './ProductCheckStatus';
import { useStyles } from './ProductCheckList.styles';

export function ProductCheckList({ checks, productId, isForceFlat = false }: {
  checks: ProductCheck[];
  productId: ProductTypes;
  isForceFlat?: boolean;
}) {
  const classes = useStyles({ fullWidth: isForceFlat || checks.length <= 4 });
  const intl = useIntl();

  return (
    <List className={classes.stepStatusList}>
      {checks.map((item) => (
        <ListItem key={item.id} className={classes.stepStatusListItem}>
          <ProductCheckStatus
            text={intl.formatMessage({ id: `${productId}.card.check.${item.id}` })}
            disabled={!item.isActive}
          />
        </ListItem>
      ))}
    </List>
  );
}
