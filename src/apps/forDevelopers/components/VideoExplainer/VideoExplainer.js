import { IconButton, Typography, Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as PlayIcon } from '../../../../assets/video-player-play.svg';
import { VideoPlayer } from '../../../../components';

export const VideoExplainer = ({ name, videoURL, videoCover }) => {
  const intl = useIntl();
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {intl.formatMessage({ id: 'forDevs.videoExplainer.header' })}
      </Typography>
      <Box mb={2} color="common.black75">
        {intl.formatMessage({ id: 'forDevs.videoExplainer.description' }, { platform: name })}
      </Box>
      <VideoPlayer controls light={videoCover} playing muted url={videoURL} playIcon={<IconButton><PlayIcon /></IconButton>} />
    </Box>
  );
};
