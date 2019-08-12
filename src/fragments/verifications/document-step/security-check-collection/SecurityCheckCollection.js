/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { Click } from 'components'
import { FormattedMessage } from 'react-intl'
import { FaRegQuestionCircle as QuestionMark } from 'react-icons/fa'
import CSS from './SecurityCheckCollection.module.scss'
import { createOverlay } from 'components/overlay'
import HelpMessage from '../../help-message'

function showHelpMessage(id) {
  createOverlay(<HelpMessage id={id} />)
}

function getStepStatus(id, error, status) {
  if (status === 200) {
    return error ? 'failure' : 'success';
  }

  return 'checking';
}

export default function SecurityCheckCollection({ steps = [] }) {
  return (
    <table className="mgi-table">
      <colgroup>
        <col width="40%"/>
        <col width="60%" />
      </colgroup>
      <tbody>
        {steps.map(({id, error, status}) => (
          <tr key={id}>
            <td css={css`white-space: nowrap;`}>
              <FormattedMessage id={`SecurityCheckStep.${id}.title`} />
              <Click padding="0" onClick={showHelpMessage.bind(null, id)} className={CSS.iconBox}>
                <QuestionMark />
              </Click>
            </td>
            <td>
              <span className={error ? 'text-error' : 'text-normal'}>
                <FormattedMessage id={`SecurityCheckStep.${id}.${getStepStatus(id, error, status)}`} />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
