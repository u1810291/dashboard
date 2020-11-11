import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';

export function PageContent({ title, children }) {
  return (
    <Container maxWidth={false}>
      <Box mt={2}>
        <Typography variant="h2">{title}</Typography>
      </Box>
      <Box mt={2} mb={2}>
        {children}
      </Box>
    </Container>
  );
}
