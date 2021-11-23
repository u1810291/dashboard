import { Box, Typography } from '@material-ui/core';
import { DateFormat, formatDate } from 'lib/date';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useStyles } from './AgentActionInfo.styles';

export function AgentActionInfo({ id, actionTypeToken, date, linkTo }: {
  id?: string;
  date: string;
  actionTypeToken: string;
  linkTo?: string;
}) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box color="common.black75">
      <Box>
        {date && formatDate(date, DateFormat.DateTime)}
      </Box>
      <Box mt={1} fontWeight="bold">
        {actionTypeToken && intl.formatMessage({ id: actionTypeToken })}
      </Box>
      {id && (
        <Typography className={classes.value}>
          {linkTo ? (
            <Link to={linkTo}>
              {id}
            </Link>
          ) : id}
        </Typography>
      )}
    </Box>
  );
}
