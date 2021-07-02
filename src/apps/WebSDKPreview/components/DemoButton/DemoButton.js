import { Box, Divider, Paper } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { VideoPlayer } from 'apps/ui';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectCurrentFlowId, selectStyleModel } from 'state/merchant/merchant.selectors';
import { Android, Apple, Monitor, PlayCircle } from '../../icons';
import { PRODUCT_DEMO_CDN_URL } from '../../models/demoButton.model';
import { DemoVideoButton, useStyles } from './DemoButton.styles';

export function DemoButton() {
  const intl = useIntl();
  const styleModel = useSelector(selectStyleModel);
  const clientIdModel = useSelector(selectClientIdModel);
  const flowId = useSelector(selectCurrentFlowId);
  const classes = useStyles();
  const [createOverlay] = useOverlay();

  const VideoFrame = useCallback(({ url }) => (
    <Paper className={classes.videoFrame}>
      <Box p={2}>
        <VideoPlayer url={url} playing controls />
      </Box>
    </Paper>
  ), [classes.videoFrame]);

  const showUseCaseModal = useCallback((url) => {
    createOverlay(<VideoFrame url={url} />);
  }, [createOverlay, VideoFrame]);

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
