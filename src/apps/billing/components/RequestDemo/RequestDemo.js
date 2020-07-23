import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useContactUsLink } from 'lib/contactUs';
import React from 'react';
import { useIntl } from 'react-intl';

export function RequestDemo() {
  const intl = useIntl();
  const externalLinkHandler = useContactUsLink(intl.locale);

  return (
    <Paper>
      <Box p={4} display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Box mb={2}>
            <Typography variant="h4">
              {intl.formatMessage({ id: 'Pricing.RequestCall.header' })}
            </Typography>
          </Box>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'Pricing.RequestCall.requestText' })}
          </Typography>
        </Box>

        <Button variant="outlined" color="primary" onClick={externalLinkHandler} size="large">
          {intl.formatMessage({ id: 'Pricing.RequestCall.button' })}
        </Button>
      </Box>
    </Paper>
  );
}
