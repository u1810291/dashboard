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
            <span
              className={classNames(
                CSS.caption,
                'text-caption',
                'text-secondary'
              )}
            >
              {field.caption}
            </span>
            <img
              className={CSS.icon}
              src={icons[field.status]}
              alt={field.status}
            />
            <small>
              <strong>
                {field.value}
              </strong>
            </small>
          </li>
        </React.Fragment>
      ))}
    </ul>
  )
}

export default injectIntl(DocumentFields)
