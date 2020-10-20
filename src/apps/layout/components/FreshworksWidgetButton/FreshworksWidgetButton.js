import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useStyles } from './FreshworksWidgetButton.styles';

export function FreshworksWidgetButton({ text }) {
  const classes = useStyles();

  const openWidget = useCallback(() => {
    if (window.FreshworksWidget !== undefined) {
      window.FreshworksWidget('open');
    }
  }, []);

  return (
    <Button
      className={classes.button}
      onClick={openWidget}
      variant="outlined"
    >
      {text}
    </Button>
  );
}
