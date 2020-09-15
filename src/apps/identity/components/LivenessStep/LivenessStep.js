import { Box, Divider, IconButton, Paper, Typography } from '@material-ui/core';
import { HelpMessage } from 'components';
import { createOverlay } from 'components/overlay';
import React, { useCallback } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { BiometricSection } from '../BiometricSection/BiometricSection';
import config from './config.json';
import { useStyles } from './LivenessStep.styles';
import { LivenessVideo } from './LivenessVideo';

export function Checks({ title, color = 'gray', body }) {
  const showHelpMessage = useCallback((id) => {
    createOverlay(<HelpMessage id={id} />);
  }, []);

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">
        {title}
      </Typography>
      <Box ml={0.5}>
        <IconButton
          size="small"
          onClick={() => showHelpMessage('liveness')}
        >
          <FaRegQuestionCircle color="text.secondary" />
        </IconButton>
      </Box>
      <Box ml={2} color={`var(--mgi-theme-palette-${color})`}>
        {body}
      </Box>
    </Box>
  );
}

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
                <Checks
                  color={config[status].checks.color}
                  title={intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}
                  body={intl.formatMessage({ id: config[status].checks.message })}
                />
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
