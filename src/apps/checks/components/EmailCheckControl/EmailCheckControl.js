import React from 'react';
import { Button } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useStyles } from './EmailCheckControl.styles';

export function EmailCheckControl() {
  const intl = useIntl();
  const classes = useStyles();

  function clickHandler() {

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
      {intl.formatMessage({ id: 'Product.checks.emailCheck.buttonText' })}
    </Button>
  );
}
