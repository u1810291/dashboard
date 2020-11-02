import { Box, Button, Collapse } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useStyles } from './CascadeMenuButton.styles';

export const CascadeMenuButton = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const handleOnClick = useCallback(() => {
    setIsOpen(((prevState) => !prevState));
  }, []);

  return (
    <Box>
      <Button
        className={classes.button}
        onClick={handleOnClick}
        fullWidth
      >
        {name}
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
