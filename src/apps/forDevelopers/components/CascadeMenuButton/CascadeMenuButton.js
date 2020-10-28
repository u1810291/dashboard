import { Collapse } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useCallback, useState } from 'react';
import Button from '../../../../components/button';

export const CascadeMenuButton = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = useCallback(() => {
    setIsOpen(((prevState) => !prevState));
  }, []);

  return (
    <Grid item direction="column">
      <Button onClick={handleOnClick}>{name}</Button>
      <Collapse in={isOpen}>
        <Grid container direction="column">
          {children}
        </Grid>
      </Collapse>
    </Grid>
  );
};
