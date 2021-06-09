import React from 'react';
import { Box } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { getIdentityStatusLabel, getStatusById, IdentityStatuses } from 'models/Status.model';
import { useStyles } from './StatusBadge.styles';

export interface StatusBadgeProps {
  statusId: IdentityStatuses,
}

export function StatusBadge({ statusId }: StatusBadgeProps) {
  const intl = useIntl();
  const classes = useStyles();
  const status = getStatusById(statusId);

  return (
    <Box px={1.2} py={0.5} bgcolor={status?.color} className={classes.root}>
      <Box color={status?.textColor} fontWeight="bold">
        {intl.formatMessage({ id: getIdentityStatusLabel(statusId) })}
      </Box>
    </Box>
  );
}
