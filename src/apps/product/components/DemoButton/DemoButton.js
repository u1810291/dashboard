import { useIntl } from 'react-intl';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { Card, createOverlay, VideoPlayer } from 'components';
import { selectClientIdModel, selectStyleModel, selectCurrentFlowId } from 'state/merchant/merchant.selectors';
import { Paper, Box, Divider } from '@material-ui/core';
import { useStyles, DemoVideoButton } from './DemoButton.styles';
import { Apple, Android, Monitor, PlayCircle } from '../../icons';

const CDN_URL = 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/demos';

export function DemoButton() {
  const intl = useIntl();
  const styleModel = useSelector(selectStyleModel);
  const clientIdModel = useSelector(selectClientIdModel);
  const flowId = useSelector(selectCurrentFlowId);
  const classes = useStyles();

  const VideoFrame = ({ url }) => (
    <Card className={classes.videoFrame}>
      <VideoPlayer url={url} playing controls />
    </Card>
  );

  const showUseCaseModal = useCallback((url) => {
    trackEvent(MixPanelEvents.VideoShowCase);
    createOverlay(<VideoFrame url={url} />);
  }, []);

  return (
    <Paper className={classes.root}>
      <Box fontWeight="bold">{intl.formatMessage({ id: 'VerificationFlow.demo.header' })}</Box>
      <Box mt={4} display="flex" justifyContent="center">
        {clientIdModel.isLoaded && styleModel && clientIdModel.value && (
          <mati-button
            color={styleModel.color}
            clientId={clientIdModel.value}
            language={styleModel.language}
            apiHost={process.env.REACT_APP_API_URL}
            signupHost={process.env.REACT_APP_SIGNUP_URL}
            flowId={flowId}
          />
        )}
      </Box>
      <Box mt={3}><Divider className={classes.divider} /></Box>
      <Box mt={2}>{intl.formatMessage({ id: 'VerificationFlow.demo.videosHeader' })}</Box>
      <Box mt={2} className={classes.playButtonsContainer}>
        <DemoVideoButton
          startIcon={<Monitor />}
          endIcon={<PlayCircle />}
          onClick={() => showUseCaseModal(`${CDN_URL}/web-sdk.mp4`)}
        >
          {intl.formatMessage({ id: 'VerificationFlow.demo.webSdk' })}
        </DemoVideoButton>

        <DemoVideoButton
          startIcon={<Apple />}
          endIcon={<PlayCircle />}
          onClick={() => showUseCaseModal(`${CDN_URL}/ios-sdk.mp4`)}
        >
          {intl.formatMessage({ id: 'VerificationFlow.demo.iosSdk' })}
        </DemoVideoButton>

        <DemoVideoButton
          startIcon={<Android />}
          endIcon={<PlayCircle />}
          onClick={() => showUseCaseModal(`${CDN_URL}/android-sdk.mp4`)}
        >
          {intl.formatMessage({ id: 'VerificationFlow.demo.androidSdk' })}
        </DemoVideoButton>
      </Box>
    </Paper>
  );
}
