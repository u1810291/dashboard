import React from 'react';
import { Button } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { EmailCheckLink } from '../../models/Checks.model';
import { useStyles } from './EmailCheckControl.styles';

export function EmailCheckControl() {
  const intl = useIntl();
  const classes = useStyles();

  function clickHandler() {
    window.open(EmailCheckLink, '_blank');
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
