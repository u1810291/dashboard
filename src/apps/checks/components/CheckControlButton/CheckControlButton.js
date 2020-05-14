import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@material-ui/core';
import { useStyles } from './CheckControlButton.styles';

export function CheckControlButton({ link, buttonText }) {
  const intl = useIntl();
  const classes = useStyles();

  function clickHandler() {
    window.open(link, '_blank');
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      disableElevation
      onClick={clickHandler}
      className={classes.root}
    >
      {intl.formatMessage({ id: buttonText })}
    </Button>
  );
}
