import { Typography } from '@material-ui/core';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useStyles } from './AlwaysOpenTab.styles';

export const AlwaysOpenTab = ({ name, children }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.tab}>{name}</Typography>
      {children}
    </Box>
  );
};
