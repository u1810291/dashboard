import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { useIntl } from 'react-intl';

export function HistoryFileDownloaded({ eventType }) {
  const intl = useIntl();

  return (
    <Box color="common.black75">
      <Grid container wrap="nowrap">
        <Box mr={0.5} fontSize={17}>
          <FiDownload />
        </Box>
        <Typography variant="subtitle2">
          {intl.formatMessage({ id: `VerificationHistory.${eventType}` })}
        </Typography>
      </Grid>
    </Box>
  );
}
