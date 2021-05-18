import { Box } from '@material-ui/core';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { getIdentityStatusLabel, getStatusById } from 'models/Status.model';
import { useIntl } from 'react-intl';
import { useStyles } from './HistoryStatusChanged.styles';

export function HistoryStatusChanged({ changes }) {
  const intl = useIntl();
  const { previousValue, value } = changes;
  const prevColor = getStatusById(previousValue)?.color;
  const nextColor = getStatusById(value)?.color;
  const classes = useStyles({ prevColor, nextColor });

  return (
    <Box display="flex" alignItems="center" className={classes.status}>
      <Box color={prevColor}>
        {intl.formatMessage({ id: getIdentityStatusLabel(previousValue) })}
      </Box>
      <Box display="flex" mx={1} fontSize={17} color="common.black75">
        <FiArrowRight />
      </Box>
      <Box color={nextColor}>
        {intl.formatMessage({ id: getIdentityStatusLabel(value) })}
      </Box>
    </Box>
  );
}
