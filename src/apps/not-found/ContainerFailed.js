import { Box, Container } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';

export function ContainerFailed() {
  const intl = useIntl();

  return (
    <Container>
      <Box py={3} height="100%" display="flex" alignItems="center" justifyContent="center">
        {intl.formatMessage({ id: 'error.common' })}
      </Box>
    </Container>
  );
}
