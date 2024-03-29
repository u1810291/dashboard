import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './PageLoader.styles';

export function PageLoader({ minHeight = 'auto', size, color }: {
  minHeight?: string;
  size?: number;
  color?: string;
}) {
  const classes = useStyles({ color });
  return (
    <Box
      alignItems="center"
      alignSelf="stretch"
      display="flex"
      flexGrow={1}
      height="100%"
      justifyContent="center"
      justifySelf="center"
      minHeight={minHeight}
      width="100%"
    >
      <CircularProgress color="primary" size={size} classes={{ root: classes.root }} />
    </Box>
  );
}
