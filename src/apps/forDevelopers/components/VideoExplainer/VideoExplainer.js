import { IconButton, Typography, Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as PlayIcon } from '../../../../assets/video-player-play.svg';
import { VideoPlayer } from '../../../../components';

export function VideoExplainer({ tabId, videoURL, videoCover }) {
  const intl = useIntl();
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {intl.formatMessage({ id: 'forDevs.videoExplainer.header' })}
      </Typography>
      <Box mb={2} color="common.black75">
        {intl.formatMessage({ id: `forDevs.informationPage.${tabId}.videoExplainer` })}
      </Box>
      <Box p={{ xs: 0, md: 2 }} bgcolor="common.black90" borderRadius={5}>
        <Box maxWidth={{ xs: 'none', md: '40vw' }} mx="auto" overflow="hidden" borderRadius={5}>
          <VideoPlayer controls light={videoCover} playing url={videoURL} playIcon={<IconButton><PlayIcon /></IconButton>} />
        </Box>
      </Box>
    </Box>
  );
}
