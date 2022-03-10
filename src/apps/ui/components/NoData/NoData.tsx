import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { FiInbox } from 'react-icons/fi';
import { useStyles } from './NoData.styles';

export function NoData() {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  return (
    <Box className={classes.wrap}>
      <FiInbox size={30} />
      <Typography variant="h5" className={classes.title}>{formatMessage('noData')}</Typography>
    </Box>
  );
}
