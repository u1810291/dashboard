import { Box, Typography } from '@material-ui/core';
import React from 'react';

export function IntegrationSection({ title, children }) {
  return (
    <Box m={4}>
      <Typography variant="h2">{title}</Typography>
      <Box mx={2} my={3}>{children}</Box>
    </Box>
  );
}
