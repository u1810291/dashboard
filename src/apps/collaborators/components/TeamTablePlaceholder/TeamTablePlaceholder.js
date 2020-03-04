import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { ReactComponent as TablePlaceholder } from './team.svg';

export function TeamTablePlaceholder({ onInvite }) {
  const intl = useIntl();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={240}
    >
      <TablePlaceholder />
      <Typography variant="body1">{intl.formatMessage({ id: 'teamTable.no-data' })}</Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FiUserPlus />}
          onClick={onInvite}
        >
          {intl.formatMessage({ id: 'settings.teamSettings.inviteTeammate' })}
        </Button>
      </Box>
    </Box>
  );
}
