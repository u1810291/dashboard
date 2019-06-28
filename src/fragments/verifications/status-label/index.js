import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import CSS from './StatusLabel.module.scss'

export default function StatusLabel({ status, coloredText }) {
  return (
    <span
      className={classNames(coloredText && CSS.coloredText, CSS.status, status)}
    >
      <FormattedMessage id={`statuses.${status}`} />
    </span>
  )
}
