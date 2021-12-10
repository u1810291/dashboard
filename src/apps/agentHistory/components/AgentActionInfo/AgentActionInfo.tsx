import { Box, Typography } from '@material-ui/core';
import { BoxLabeled } from 'apps/ui';
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
      <BoxLabeled label={date && formatDate(date, DateFormat.DateTime)}>
        <Box fontWeight="bold" color="common.black">
          {actionTypeToken && intl.formatMessage({ id: actionTypeToken })}
        </Box>
      </BoxLabeled>
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
