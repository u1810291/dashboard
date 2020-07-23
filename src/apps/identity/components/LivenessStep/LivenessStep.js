import { Box, Paper, Typography, Divider } from '@material-ui/core';
import { HelpMessage, QuestionMark } from 'components';
import { createOverlay } from 'components/overlay';
import Text from 'components/text';
import React from 'react';
import { useIntl } from 'react-intl';
import { BiometricSection } from '../BiometricSection/BiometricSection';
import config from './config.json';
import { LivenessVideo } from './LivenessVideo';
import { useStyles } from './LivenessStep.styles';

const showHelpMessage = (id) => createOverlay(<HelpMessage id={id} />);

const Checks = ({ intl, color = 'gray', children }) => (
  <Box display="flex">
    <Box whiteSpace="nowrap" flex="0 1 190px">
      {intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}
      <QuestionMark onClick={() => showHelpMessage('liveness')} />
    </Box>
    <Box flex="1 1 auto">
      <Text color={color}>
        {children}
      </Text>
    </Box>
  </Box>
);

export function LivenessStep({ liveness }) {
  const intl = useIntl();
  const classes = useStyles();
  const { videoUrl, selfieUrl, status } = liveness;

  return (
    <Paper>
      <Box p={4}>
        <Typography variant="h3">
          {intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}
        </Typography>
        {videoUrl && (
          <>
            <Box my={2}>
              <Divider variant="fullWidth" />
            </Box>
            <BiometricSection
              title={intl.formatMessage({ id: 'LivenessStep.Checks.video.title' })}
              picture={<LivenessVideo url={videoUrl} />}
              content={(
                <Checks color={config[status].checks.color} intl={intl}>
                  {intl.formatMessage({ id: config[status].checks.message })}
                </Checks>
              )}
            />
          </>
        )}
        {selfieUrl && (
          <>
            <Box my={2}>
              <Divider variant="fullWidth" />
            </Box>
            <BiometricSection
              title={!videoUrl
                ? intl.formatMessage({ id: 'LivenessStep.Checks.selfie.title' })
                : intl.formatMessage({ id: 'LivenessStep.Checks.selfieExtracted.title' })}
              picture={<img src={selfieUrl} alt="" className={classes.borderRadius} />}
            />
          </>
        )}
      </Box>
    </Paper>
  );
}
