import React from 'react'
import { injectIntl } from 'react-intl'

import classNames from 'classnames'
import CSS from './document-fields.module.scss'

const icons = {
  success: require('./success.svg'),
  failure: require('./failure.svg'),
  warning: require('./warning.svg')
}

function DocumentFields({ fields = [], intl }) {
  return (
    <ul className={CSS.fields}>
      {fields.map(field => (
        <React.Fragment>
          <li>
            <strong className={classNames(CSS.caption, 'text-secondary')}>
              {field.caption.testError()}
            </strong>
            <img
              className={CSS.icon}
              src={icons[field.status]}
              alt={field.status}
            />
            <strong>{field.value}</strong>
          </li>
        </React.Fragment>
      ))}
    </ul>
  )
}

export default injectIntl(DocumentFields)
