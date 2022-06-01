import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { IProductCard, ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { WarningBadge } from '../WarningBadge/WarningBadge';
import { useStyles } from './UIProductTab.styles';

export function UIProductTab({ card, isSelected, hasBadge, onSelect, isDisabled }: {
  card: IProductCard;
  isSelected?: boolean;
  hasBadge?: boolean;
  onSelect: (id: ProductTypes) => void;
  isDisabled?: boolean;
}) {
  const intl = useIntl();

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      onSelect(card.id);
    }
  }, [isDisabled, onSelect, card.id]);

  const classes = useStyles();

  return (
    <Box
      p={1}
      mb={1}
      onClick={handleClick}
      className={classNames(classes.tab, {
        [classes.selected]: isSelected,
        [classes.disabled]: isDisabled,
      })}
    >
      {hasBadge && <WarningBadge />}
      {intl.formatMessage({ id: card.title })}
    </Box>
  );
}
