/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'
import Card from 'components/card'
import { default as Text } from 'components/text';
import { Click } from 'components'
import { ReactComponent as Placeholder } from './placeholder.svg'
import CSS from './LivenessStep.module.scss'
import { FaRegQuestionCircle as QuestionMark } from 'react-icons/fa'
import { createOverlay } from 'components/overlay'
import HelpMessage from '../help-message'
import config from './config'

const videoStyle = css`
  width: 230px;
  max-height: 306px;
  object-fit: cover;
  object-position: center;
`
function showHelpMessage(id) {
  createOverlay(<HelpMessage id={id} />)
}

const LivenessVideo = ({url}) => url ? (
    <video
      css={videoStyle}
      autoPlay
      muted
      onMouseOver={({ target }) => {
        target.loop = true
        target.play()
      }}
      onMouseLeave={({ target }) => {
        target.loop = false
        target.pause()
      }}
      src={url}
    />
  ) : <Placeholder />
  
const Checks = ({
  color = 'gray',
  children
}) => (
  <div className={CSS.checkSection}>
    <h2><FormattedMessage id="LivenessStep.Checks.title" /></h2>
    <div>
      <Text lineHeight={3}>
        <FormattedMessage id="LivenessStep.Checks.statusTitle" />
        <Click padding="0" onClick={showHelpMessage.bind(null, 'liveness')} className={CSS.iconBox}>
          <QuestionMark />
        </Click>
      </Text>
      <Text color={color} className={CSS.statusMessage}>{children}</Text>
    </div>
  </div>
)

/**
 * Liveness step component generator
 * @param {object} 
 */
const LivenessStep = ({status, step, info}) => (
  <Card flow="column" padding={4} templateColumns="5fr auto">
    <div>
      <Checks color={config[status].checks.color}>
        <FormattedMessage id={config[status].checks.message} />
      </Checks>
    </div>
    <Card padding={0} shadow={get(step, 'data.videoUrl', 0)}>
      <LivenessVideo url={step.data && step.data.videoUrl} />
    </Card>
  </Card>  
);

/**
 * Obtain a named status by code from step
 * @param {object} step 
 */
const getStatusByCode = step => Object.entries({
  skipped: step => step.status === 0,
  inProgress: step => step.status === 100,
  error: step => step.status === 200 && step.error,
  success: step => step.status ===200 && !step.error
}).filter(([key, func]) => func(step))[0][0];

export default ({
  step = {},
  status = getStatusByCode(step),
  info = {},
}) => LivenessStep({ status, step, info });
