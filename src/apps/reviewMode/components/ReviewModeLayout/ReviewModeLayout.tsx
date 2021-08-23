import { Box } from '@material-ui/core';
import { useWindowsScrolledListener } from 'apps/layout/hooks/WindowScrolledListener';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { ReviewModeHeaderMenu } from '../ReviewModeHeaderMenu/ReviewModeHeaderMenu';
import { useStyles } from './ReviewModeLayout.styles';

export function ReviewModeLayout({ children }: { children?: ReactNode }) {
  const classes = useStyles();
  const isScrolled = useWindowsScrolledListener();

  return (
    <Box className={classes.root}>
      <Box px={{ xs: 4, lg: 6 }} className={classNames(classes.header, { [classes.headerScrolled]: isScrolled })}>
        <Box pt={2} mb={4}>
          <ReviewModeHeaderMenu />
        </Box>
      </Box>
      <Box px={{ xs: 2, lg: 4 }} className={classes.container}>
        {children}
      </Box>
    </Box>
  );
}
