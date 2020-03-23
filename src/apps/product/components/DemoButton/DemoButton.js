import React from 'react';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectStyleModel } from 'state/merchant/merchant.selectors';
import { Paper, Box, Divider } from '@material-ui/core';
import { useStyles, DemoVideoButton } from './DemoButton.styles';
import { Apple, Android, Monitor, PlayCircle } from '../../icons';

const header = 'Test your verification flow now';
const demoVideos = 'Demo videos';
const webSDK = 'Web SDK';
const iosSDK = 'iOS SDK';
const androidSDK = 'Android SDK';

export function DemoButton() {
  const styleModel = useSelector(selectStyleModel);
  const clientIdModel = useSelector(selectClientIdModel);
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box fontWeight="bold">{header}</Box>
      <Box mt={4} display="flex" justifyContent="center">
        {clientIdModel.isLoaded && styleModel && clientIdModel.value && (
          <mati-button
            color={styleModel.color}
            clientId={clientIdModel.value}
            language={styleModel.language}
            apiHost={process.env.REACT_APP_API_URL}
            signupHost={process.env.REACT_APP_SIGNUP_URL}
          />
        )}
      </Box>
      <Box mt={3}><Divider className={classes.divider} /></Box>
      <Box mt={2}>{demoVideos}</Box>
      <Box mt={2} className={classes.playButtonsContainer}>
        <DemoVideoButton startIcon={<Monitor />} endIcon={<PlayCircle />}>{webSDK}</DemoVideoButton>
        <DemoVideoButton startIcon={<Apple />} endIcon={<PlayCircle />}>{iosSDK}</DemoVideoButton>
        <DemoVideoButton startIcon={<Android />} endIcon={<PlayCircle />}>{androidSDK}</DemoVideoButton>
      </Box>
    </Paper>
  );
}
