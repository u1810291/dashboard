import { Box, Grid, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { DateFormat, formatDate } from 'lib/date';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { getIdentityStatusLabel, getStatusById, IdentityStatuses } from 'models/Status.model';
import { useStyles } from './VerificationItem.styles';

export interface VerificationItemProps{
  date: string;
  id: string;
  status: IdentityStatuses;
  onClick: () => void;
  isSelected: boolean;
}

export function VerificationItem({ date, status, id, onClick, isSelected }: VerificationItemProps) {
  const classes = useStyles();
  const intl = useIntl();
  const statusText = useMemo(() => intl.formatMessage({ id: getIdentityStatusLabel(status) }), [intl, status]);
  const statusColor = useMemo(() => getStatusById(status)?.color, [status]);

  return (
    <Box onClick={onClick} px={2} py={1} className={classNames(classes.select, { [classes.selected]: isSelected })}>
      <Grid container spacing={1} wrap="nowrap" justify="space-between" alignItems="center">
        <Grid item>
          <Box color="common.black90" fontWeight="bold">
            {formatDate(date, DateFormat.MonthShort)}
          </Box>
        </Grid>
        <Grid item>
          <Typography align="right">
            <Box color={statusColor} component="span" fontWeight="bold">
              {statusText}
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <Box mt={1} color="common.black75" className={classes.id}>
        {id}
      </Box>
    </Box>
  );
}
