import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import CSS from './StatusLabel.scss'

export default function StatusLabel({ status }) {
  return (
    <span className={classNames(CSS.status, status)}>
      <i />
      <FormattedMessage id={`statuses.${status}`} />
    </span>
  )
}
