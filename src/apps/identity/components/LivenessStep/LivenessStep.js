import { Box } from '@material-ui/core';
import { Card, HelpMessage, QuestionMark } from 'components';
import { createOverlay } from 'components/overlay';
import Text, { HR } from 'components/text';
import React from 'react';
import { useIntl } from 'react-intl';
import { BiometricSection } from './BiometricSection';
import config from './config.json';
import CSS from './LivenessStep.module.scss';
import { LivenessVideo } from './LivenessVideo';

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
  const { videoUrl, selfieUrl, status } = liveness;

  return (
    <Card padding={4} gap={1}>
      <Text size={4.5} weight={4}>
        {intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}
      </Text>
      <HR />
      {videoUrl && (
        <BiometricSection
          title={intl.formatMessage({ id: 'LivenessStep.Checks.video.title' })}
          picture={<LivenessVideo url={videoUrl} />}
          content={(
            <Checks color={config[status].checks.color} intl={intl}>
              {intl.formatMessage({ id: config[status].checks.message })}
            </Checks>
          )}
        />
      )}
      {selfieUrl && (
        <>
          {videoUrl && <HR />}
          <BiometricSection
            title={!videoUrl
              ? intl.formatMessage({ id: 'LivenessStep.Checks.selfie.title' })
              : intl.formatMessage({ id: 'LivenessStep.Checks.selfieExtracted.title' })}
            picture={<img src={selfieUrl} alt="" className={CSS.borderRadius} />}
          />
        </>
      )}
    </Card>
  );
}
