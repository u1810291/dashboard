import { Box, Container } from '@material-ui/core';
import React from 'react';

export function NotFound() {
  return (
    <Container>
      <Box py={3} height="100%" display="flex" alignItems="center" justifyContent="center">
        Not Found
      </Box>
    </Container>
  );
}
