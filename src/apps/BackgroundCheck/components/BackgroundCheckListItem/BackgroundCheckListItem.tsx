import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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
