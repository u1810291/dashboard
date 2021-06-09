import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './RoundProfilePicture.styles';

export function RoundProfilePicture({ image }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {image}
    </Box>
  );
}
