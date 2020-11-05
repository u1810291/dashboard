import { Box, Button, Collapse } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useStyles } from './CascadeMenuButton.styles';
import { getIsSelected } from '../../../../models/ForDevelopers.model';

export const CascadeMenuButton = ({ tab, selected, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const classes = useStyles();
  const isSelected = getIsSelected(tab, selected);

  const handleOnClick = useCallback(() => {
    setIsOpen(((prevState) => !prevState));
  }, []);

  return (
    <Box>
      <Button
        className={`${classes.button} ${isSelected && classes.selected} ${isOpen && classes.open}`}
        onClick={handleOnClick}
        fullWidth
      >
        <Box pr={0.4}>{tab.name}</Box>
        <FiChevronDown />
      </Button>
      <Collapse in={isOpen}>
        <Box ml={1}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
