import React from 'react';
import { ImSpinner2 } from 'react-icons/all';
import { Box } from '@material-ui/core';
import classnames from 'classnames';
import { useStyles } from 'apps/ui/components/Spinner/Spinner.styles';

export function Spinner({ spinnerIcon = <ImSpinner2 />, className, size = 'small' }: {spinnerIcon?: React.ReactNode; className?: string; size?: 'small' | 'medium'}) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classnames(classes.spinner, className, `spinner-${size}`)}>
      {spinnerIcon}
    </Box>
  );
}
