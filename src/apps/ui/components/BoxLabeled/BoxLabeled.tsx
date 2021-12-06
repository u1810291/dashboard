import { Box } from '@material-ui/core';
import React from 'react';

export function BoxLabeled({ label, children, ...props }: {
  label: React.ReactNode;
  children: React.ReactNode;
  [x: string]: any;
}) {
  return (
    <Box {...props}>
      <Box mb={0.5} fontSize={10} color="common.black75" fontWeight="normal">
        {label}
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  );
}
