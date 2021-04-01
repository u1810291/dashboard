import React, { useCallback, useState } from 'react';
import { Box, Button, Collapse } from '@material-ui/core';
import { FiChevronDown } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import cn from 'classnames';
import { getIsSelected } from '../../models/ForDevelopers.model';
import { useStyles } from './CascadeMenuButton.styles';

export function CascadeMenuButton({ tab, selectedId, defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const intl = useIntl();
  const classes = useStyles();
  const isSelected = getIsSelected(tab, selectedId);

  const handleOnClick = useCallback(() => {
    setIsOpen(((prevState) => !prevState));
  }, []);

  return (
    <Box>
      <Button
        className={cn(classes.button, {
          [classes.selected]: isSelected,
          [classes.open]: isOpen,
        })}
        onClick={handleOnClick}
        fullWidth
        data-qa={tab.qa}
      >
        <Box pr={0.4}>{intl.formatMessage({ id: `forDevs.sideMenu.${tab.id}` })}</Box>
        <FiChevronDown />
      </Button>
      <Collapse in={isOpen}>
        <Box ml={1}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
