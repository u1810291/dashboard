import { Box } from '@material-ui/core';
import { AppTheme } from 'apps/theme/app.theme';
import React from 'react';

export const BoxBordered = ((props) => (
  <Box
    px={1}
    py={2}
    border={1}
    borderRadius={AppTheme.shape.borderRadius}
    borderColor={AppTheme.palette.common.lightgray}
    {...props}
  />
));
