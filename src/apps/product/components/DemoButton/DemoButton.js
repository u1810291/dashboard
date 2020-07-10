import { Box, Divider, Paper } from '@material-ui/core';
import { Card, createOverlay, VideoPlayer } from 'components';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectCurrentFlowId, selectStyleModel } from 'state/merchant/merchant.selectors';
import { Android, Apple, Monitor, PlayCircle } from '../../icons';
import { PRODUCT_DEMO_CDN_URL } from '../../models/Product.model';
import { DemoVideoButton, useStyles } from './DemoButton.styles';

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
          onClick={() => showUseCaseModal(`${PRODUCT_DEMO_CDN_URL}/web-sdk.mp4`)}
        >
          {intl.formatMessage({ id: 'VerificationFlow.demo.webSdk' })}
        </DemoVideoButton>

        <DemoVideoButton
          startIcon={<Apple />}
          endIcon={<PlayCircle />}
          onClick={() => showUseCaseModal(`${PRODUCT_DEMO_CDN_URL}/ios-sdk.mp4`)}
        >
          {intl.formatMessage({ id: 'VerificationFlow.demo.iosSdk' })}
        </DemoVideoButton>

        <DemoVideoButton
          startIcon={<Android />}
          endIcon={<PlayCircle />}
          onClick={() => showUseCaseModal(`${PRODUCT_DEMO_CDN_URL}/android-sdk.mp4`)}
        >
          {intl.formatMessage({ id: 'VerificationFlow.demo.androidSdk' })}
        </DemoVideoButton>
      </Box>
    </Paper>
  );
}
