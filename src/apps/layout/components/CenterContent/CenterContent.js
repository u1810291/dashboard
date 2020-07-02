import { Box } from '@material-ui/core';
import React from 'react';

export function CenterContent({ children }) {
  return (
    <Box
      py={3}
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
    >
      {children}
    </Box>
  );
}
