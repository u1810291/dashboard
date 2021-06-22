import { Box, Typography, Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';

export interface PlaceholderProps{
  icon?: ReactElement,
  title?: string,
  subtitle?: string,
  text?: string,
  mb?: number
}

export function Placeholder({ icon, title, subtitle, text, mb = 0 }: PlaceholderProps) {
  return (
    <Box mb={mb}>
      <Grid container direction="column" justify="center" alignItems="center">
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
      </Grid>
    </Box>
  );
}
