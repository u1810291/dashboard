import { Box, Typography } from '@material-ui/core';
import React from 'react';

export function Placeholder({ icon, title, subtitle, text, mb = 0 }) {
  return (
    <Box mb={mb}>
      {icon && (
        <Box py={1.5}>{icon}</Box>
      )}
      {title && (
        <Box mb={1}>
          <Typography variant="h4">{title}</Typography>
        </Box>
      )}
      {subtitle && (
        <Box color="common.black50" mb={1}>
          <Typography variant="h4">{subtitle}</Typography>
        </Box>
      )}
      {text && (
        <Box color="common.black75">
          <Typography variant="body1" align="center">
            {text}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
