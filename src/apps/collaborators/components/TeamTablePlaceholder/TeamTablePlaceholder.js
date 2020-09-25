import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as TablePlaceholder } from '../../../../assets/team.svg';
import { useStyles } from './TeamTablePlaceholder.styles';

export function TeamTablePlaceholder() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box className={classes.tablePlaceholder}>
      <Box mb={1.8}>
        <TablePlaceholder />
      </Box>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: 'teamTable.no-data-header' })}
      </Typography>
      <Typography variant="body1" className={classes.tablePlaceholderText}>
        {intl.formatMessage({ id: 'teamTable.no-data' })}
      </Typography>
    </Box>
  );
}
