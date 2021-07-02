import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { IProductCard, ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { WarningBadge } from '../WarningBadge/WarningBadge';
import { useStyles } from './UIProductTab.styles';

export function UIProductTab({ card, isSelected, hasBadge, onSelect }: {
  card: IProductCard;
  isSelected?: boolean,
  hasBadge?: boolean,
  onSelect: (id: ProductTypes) => void,
}) {
  const intl = useIntl();

  const handleClick = useCallback(() => {
    onSelect(card.id);
  }, [onSelect, card.id]);

  const classes = useStyles();

  return (
    <Box
      p={1}
      mb={1}
      onClick={handleClick}
      className={classNames(classes.tab, {
        [classes.selected]: isSelected,
      })}
    >
      {hasBadge && <WarningBadge />}
      {intl.formatMessage({ id: card.title })}
    </Box>
  );
}
