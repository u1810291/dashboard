import { Box, Typography } from '@material-ui/core';
import { DateFormat, formatDate } from 'lib/date';
import React from 'react';
import { useIntl } from 'react-intl';
import { getAgentEventToken } from 'models/History.model';
import { useStyles } from './AgentActionInfo.styles';

export function AgentActionInfo({ id, eventType, date }) {
  const classes = useStyles();
  const intl = useIntl();
  const actionTypeToken = getAgentEventToken(eventType);

  return (
    <Box color="common.black75">
      <Box>
        {date && formatDate(date, DateFormat.DateTime)}
      </Box>
      <Box mt={1} fontWeight="bold">
        {actionTypeToken && intl.formatMessage({ id: actionTypeToken })}
      </Box>
      <Typography className={classes.value}>{id}</Typography>
    </Box>
  );
}
