import { List, ListItem } from '@material-ui/core';
import classNames from 'classnames';
import { IProductCard } from 'models/Product.model';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ProductCheckStatus } from './ProductCheckStatus';
import { useStyles } from './ProductCheckList.styles';

export function ProductCheckList({ cards, isForceFlat = false }: {
  cards: IProductCard[];
  isForceFlat?: boolean;
}) {
  const classes = useStyles();
  const intl = useIntl();

  const allChecksLength = useMemo(() => cards.reduce((sum, item) => sum + item.checks.length, 0), [cards]);

  return (
    <List
      className={classNames(classes.stepStatusList, {
        [classes.fullWidth]: isForceFlat || allChecksLength <= 4,
      })}
    >
      {cards.map((card) => card.checks.map((check) => (
        <ListItem key={`${card.id}-${check.id}`} className={classes.stepStatusListItem}>
          <ProductCheckStatus
            text={intl.formatMessage({ id: `${card.id}.card.check.${check.id}` })}
            disabled={!check.isActive}
          />
        </ListItem>
      )))}
    </List>
  );
}
