import { Box } from '@material-ui/core';
import { AppTheme } from 'apps/theme/app.theme';
import React from 'react';

export const BoxBordered = ((props) => (
  <Box
    p={1}
    border={1}
    borderRadius={AppTheme.shape.borderRadius}
    borderColor={AppTheme.palette.common.lightgray}
    {...props}
  />
));
