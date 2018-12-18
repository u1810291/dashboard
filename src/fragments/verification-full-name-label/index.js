import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { startCase } from 'lodash'
import CSS from './styles.scss'
import WarningIcon from './warning.svg'

export default function VerificationFullNameLabel({
  children,
  className
}) {
  return (
    <div className={classNames(CSS.fullName, className)}>
      {children ?
        startCase(children.toLowerCase()) :
        <React.Fragment>
          <span className="verification-unknown-name">
            <FormattedMessage id="identities.unknownName"/>
          </span>
          <WarningIcon/>
        </React.Fragment>
      }
    </div>
  )
}
