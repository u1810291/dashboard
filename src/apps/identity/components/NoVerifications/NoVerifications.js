import { Box, Typography } from '@material-ui/core';
import { ReactComponent as EmptyTableIcon } from 'assets/empty-list.svg';
import React from 'react';
import { useIntl } from 'react-intl';

export function NoVerifications() {
  const intl = useIntl();

  return (
    <Box mb="10vh">
      <Box py={1.5}><EmptyTableIcon /></Box>
      <Box mb={1}>
        <Typography variant="h4">{intl.formatMessage({ id: 'verificationDemo.title' })}</Typography>
      </Box>
      <Box color="common.black75">
        <Typography variant="body1" align="center">
          {intl.formatMessage({
            id: 'verificationDemo.subtitle',
          }, {
            breakingLine: <br />,
          })}
        </Typography>
      </Box>
    </Box>
  );
}
