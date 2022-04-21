import React from 'react';
import classnames from 'classnames';
import { Box } from '@material-ui/core';
import { FiAlertCircle } from 'react-icons/fi';
import { useStyles } from './WarningBadge.styles';

export function WarningBadge({ className, isDefaultPosition = true }: {
  className?: string;
  isDefaultPosition?: boolean;
}) {
  const classes = useStyles();

  return (
    <Box
      className={classnames(classes.wrapper, className, {
        [classes.default]: isDefaultPosition,
      })}
      bgcolor="common.yellow"
      color="common.black90"
      fontSize={17}
    >
      <FiAlertCircle />
    </Box>
  );
}
