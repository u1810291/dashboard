import { IconButton, Typography, Box } from '@material-ui/core';
import React from 'react';
import { ReactComponent as PlayIcon } from '../../../../assets/video-player-play.svg';
import { VideoPlayer } from '../../../../components';

export const VideoExplainer = ({ name, videoURL, videoCover }) => (
  <Box>
    <Typography variant="subtitle2" gutterBottom>Video explainer</Typography>
    <Box mb={2} color="common.black75">
      You can watch a video explanation of our
      {' '}
      {name}
      {' '}
      here
    </Box>
    <VideoPlayer controls light={videoCover} playing muted url={videoURL} playIcon={<IconButton><PlayIcon /></IconButton>} />
  </Box>
);
