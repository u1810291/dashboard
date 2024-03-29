import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { FiLayers } from 'react-icons/fi';
import { useStyles } from './DataGenerating.styles';

export function DataGenerating({ text }: { text?: string }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  return (
    <Box className={classes.wrap}>
      <FiLayers size={30} className={classes.icon} />
      <Typography variant="h5" className={classes.title}>
        {text ?? formatMessage('DataGenerating.label')}
      </Typography>
    </Box>
  );
}
