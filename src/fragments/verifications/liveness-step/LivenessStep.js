import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';
import { useIntl } from 'react-intl';

import {
  Card,
  HelpMessage,
  QuestionMark,
} from 'components';
import {
  Box,
} from '@material-ui/core';
import Text, { HR } from 'components/text';
import { createOverlay } from 'components/overlay';

import config from './config';
import CSS from './LivenessStep.module.scss';
import { ReactComponent as Placeholder } from './placeholder.svg';

const LivenessVideo = ({ url }) => (url ? (
  <video
    autoPlay
    muted
    onMouseOver={({ target }) => {
      target.loop = true;
      target.play();
    }}
    onMouseLeave={({ target }) => {
      target.loop = false;
      target.pause();
    }}
    onFocus={() => {}}
    src={url}
    className={CSS.video}
  />
) : <Placeholder />);

const showHelpMessage = (id) => createOverlay(<HelpMessage id={id} />);

const Checks = ({
  intl,
  color = 'gray',
  children,
}) => (
  <Box display="flex">
    <Box whiteSpace="nowrap" flex="0 1 190px">
      { intl.formatMessage({ id: 'LivenessStep.Checks.status.title' }) }
      <QuestionMark onClick={() => showHelpMessage('liveness')} />
    </Box>
    <Box flex="1 1 auto">
      <Text color={color}>
        {children}
      </Text>
    </Box>
  </Box>
);

const BiometricSection = ({
  title,
  picture,
  content,
}) => (
  <Box width="100%" display="flex">
    <Box flex="1 1 auto">
      <Box
        fontSize={16}
        lineHeight={2}
      >
        {title}
      </Box>
      {content && (
        <Box pr={1} ml={1}>{content}</Box>
      )}
    </Box>
    <Box flex="0 0 230px">
      {picture}
    </Box>
  </Box>
);

const LivenessStep = ({ status, step }) => {
  const intl = useIntl();
  const videoUrl = get(step, 'data.videoUrl');
  const selfieUrl = get(step, 'data.selfiePhotoUrl') || get(step, 'data.selfieUrl');

  return (
    <Card padding={4} gap={1}>
      <Text size={4.5} weight={4}>
        {intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}
      </Text>
      <HR />
      { videoUrl && (
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
      { selfieUrl && (
        <>
          { videoUrl && <HR /> }
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
};

/**
 * Obtain a named status by code from step
 * @param {object} step
 */
const getStatusByCode = (step) => Object.entries({
  skipped: ({ status }) => status === 0,
  inProgress: ({ status }) => status === 100,
  error: ({ status, error }) => status === 200 && error,
  success: ({ status, error }) => status === 200 && !error,
}).filter(([, func]) => func(step))[0][0];

export default ({
  step = {},
  status = getStatusByCode(step),
  info = {},
}) => LivenessStep({ status, step, info });

LivenessVideo.propTypes = {
  url: PropTypes.string.isRequired,
};

LivenessStep.propTypes = {
  status: PropTypes.string.isRequired,
  step: PropTypes.shape({
    data: PropTypes.shape({
      videoUrl: PropTypes.string,
    }),
  }).isRequired,
};
