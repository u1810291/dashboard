import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import CSS from './StatusLabel.scss'

export default function StatusLabel({ status, coloredText }) {
  return (
    <span className={classNames(coloredText && CSS.coloredText, CSS.status, status)}>
      <i />
      <FormattedMessage id={`statuses.${status}`} />
    </span>
  )
}
