import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { titleCase } from 'lib/string'
import CSS from './styles.module.scss'
import { ReactComponent as WarningIcon } from './warning.svg'

export default function VerificationFullNameLabel({ children, className }) {
  return (
    <div className={classNames(CSS.fullName, className)}>
      {children ? (
        titleCase(children)
      ) : (
        <React.Fragment>
          <span className="verification-unknown-name">
            <FormattedMessage id="identities.unknownName" />
          </span>
          <WarningIcon />
        </React.Fragment>
      )}
    </div>
  )
}
