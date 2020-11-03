import { Collapse } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useCallback, useState } from 'react';
import Button from '../../../../components/button';
import { useStyles } from './CascadeMenuButton.styles';

export const CascadeMenuButton = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const handleOnClick = useCallback(() => {
    setIsOpen(((prevState) => !prevState));
  }, []);

  return (
    <Grid item direction="column">
      <Button className={classes.selected} onClick={handleOnClick}>{name}</Button>
      <Collapse in={isOpen}>
        <Grid container direction="column">
          {children}
        </Grid>
      </Collapse>
    </Grid>
  );
};
