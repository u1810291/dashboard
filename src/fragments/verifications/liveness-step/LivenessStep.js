/** @jsx jsx */

import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import Card from 'components/card';
import Text from 'components/text';
import { Click } from 'components';
import { FaRegQuestionCircle as QuestionMark } from 'react-icons/fa';
import { createOverlay } from 'components/overlay';
import { ReactComponent as Placeholder } from './placeholder.svg';
import CSS from './LivenessStep.module.scss';
import HelpMessage from '../help-message';
import config from './config';

const videoStyle = css`
  width: 230px;
  max-height: 306px;
  object-fit: cover;
  object-position: center;
`;
function showHelpMessage(id) {
  createOverlay(<HelpMessage id={id} />);
}

const LivenessVideo = ({ url }) => (url ? (
  <video
    css={videoStyle}
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
  />
) : <Placeholder />);

const Checks = ({
  color = 'gray',
  children,
}) => (
  <div className={CSS.checkSection}>
    <h2><FormattedMessage id="LivenessStep.Checks.title" /></h2>
    <div>
      <table>
        <tbody>
          <tr>
            <td className={CSS.biometricTitle}>
              <Text>
                <FormattedMessage id="LivenessStep.Checks.statusTitle" />
                <Click padding="0" onClick={() => showHelpMessage('liveness')} className={CSS.iconBox}>
                  <QuestionMark />
                </Click>
              </Text>
            </td>
            <td className={CSS.messageBox}>
              <Text color={color} className={CSS.statusMessage}>{children}</Text>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

/**
 * Liveness step component generator
 * @param {object}
 */
const LivenessStep = ({ status, step }) => (
  <Card flow="column" padding={4} templateColumns="5fr auto">
    <div>
      <Checks color={config[status].checks.color}>
        <FormattedMessage id={config[status].checks.message} />
      </Checks>
    </div>
    <Card padding={0} shadow={get(step, 'data.videoUrl', 0)} className={CSS.videoFrame}>
      <LivenessVideo url={step.data && step.data.videoUrl} />
    </Card>
  </Card>
);

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

Checks.propTypes = {
  color: PropTypes.string,
};

Checks.defaultProps = {
  color: 'gray',
};

LivenessStep.propTypes = {
  status: PropTypes.string.isRequired,
  step: PropTypes.shape({
    data: PropTypes.shape({
      videoUrl: PropTypes.string,
    }),
  }).isRequired,
};
