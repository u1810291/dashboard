import React from 'react';
import ReactPlayer from 'react-player';
import { Box } from '@material-ui/core';
import { useStyles } from './VideoPlayer.styles';

export function VideoPlayer({ aspectRatio = '16:9', ...props }: {
  aspectRatio?: string;
  [x: string]: any;
}) {
  const classes = useStyles();
  const [width, height]: string[] = aspectRatio.split(':');
  const iframeHeight: number = (100 * parseInt(height, 10)) / parseInt(width, 10);

  return (
    <Box className={classes.wrapper} style={{ paddingTop: `${iframeHeight}%` }}>
      <ReactPlayer
        width="100%"
        height="100%"
        className={classes.player}
        {...props}
      />
    </Box>
  );
}
