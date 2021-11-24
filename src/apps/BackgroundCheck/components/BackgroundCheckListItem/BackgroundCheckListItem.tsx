import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './BackgroundCheckListItem.styles';

export const BackgroundCheckListItem = ({ label, value }: { label: string; value: string }) => {
  const classes = useStyles();

  return (
    <Box className={classes.summaryListItem}>
      <Typography variant="body1" className={classes.summaryListItemValue}>
        {value}
      </Typography>
      <Typography variant="body1" className={classes.colorGrey}>
        {label}
      </Typography>
    </Box>
  );
};
