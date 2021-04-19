import { Box, Container } from '@material-ui/core';
import { useWindowsScrolledListener } from 'apps/layout/hooks/WindowScrolledListener';
import classNames from 'classnames';
import React from 'react';
import { ReviewModeHeaderMenu } from '../ReviewModeHeaderMenu/ReviewModeHeaderMenu';
import { useStyles } from './ReviewModeLayout.styles';

export function ReviewModeLayout({ children }) {
  const classes = useStyles();
  const isScrolled = useWindowsScrolledListener();

  return (
    <Box className={classes.root}>
      <Container maxWidth={false} className={classNames(classes.header, { [classes.headerScrolled]: isScrolled })}>
        <Box pt={2} mb={4}>
          <ReviewModeHeaderMenu />
        </Box>
      </Container>
      <Container maxWidth={false} className={classes.container}>
        {children}
      </Container>
    </Box>
  );
}
