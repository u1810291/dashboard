import { Box } from '@material-ui/core';
import { AppTheme } from 'apps/theme/app.theme';
import React from 'react';

export const BoxBordered = ((props) => (
  <Box
    px={2}
    py={1.5}
    border={1}
    borderRadius={AppTheme.shape.borderRadius}
    borderColor={AppTheme.palette.common.lightgray}
    {...props}
  />
));
