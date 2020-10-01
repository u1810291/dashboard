import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import IntlMessage from './IntlMessage';
import { MessageTable } from './MessageTable';

// TODO @dkchv: !!! useless
const HelpMessage = ({ id }) => {
  const intl = useIntl();
  const im = new IntlMessage('fragments.verifications.help-messages', id, intl.messages);

  return (
    <Paper>
      <Box p={2} width={460}>
        <Typography variant="h4" gutterBottom>
          {intl.formatMessage({ id: im.getNode('title') })}
        </Typography>
        <Typography variant="body1">
          {intl.formatMessage({ id: im.getNode('subtitle') })}
        </Typography>
        <Box mt={1}>
          <MessageTable data={im.getTable()} />
        </Box>
      </Box>
    </Paper>
  );
};

export default HelpMessage;
