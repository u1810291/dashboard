import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CheckControlButton.styles';

export function CheckControlButton({ link, buttonText }) {
  const intl = useIntl();
  const classes = useStyles();

  const clickHandler = useCallback(() => {
    window.open(link, '_blank');
  }, [link]);

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
