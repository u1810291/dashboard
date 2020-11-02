import { IconButton, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { ReactComponent as PlayIcon } from '../../../../assets/video-player-play.svg';
import { VideoPlayer } from '../../../../components';

export const VideoExplainer = ({ name, videoURL }) => (
  <Grid container direction="column">
    <Typography>Video explainer</Typography>
    <Typography>
      You can watch a video explanation of our
      {' '}
      {name}
      {' '}
      here
    </Typography>
    <VideoPlayer controls light playing muted url={videoURL} playIcon={<IconButton><PlayIcon /></IconButton>} />
  </Grid>
);
