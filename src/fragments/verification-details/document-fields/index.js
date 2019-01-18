import React from 'react'
import { injectIntl } from 'react-intl'
import TextEditable from 'src/components/text-editable'
import classNames from 'classnames'
import CSS from './document-fields.scss'

const icons = {
  success: require('./success.svg'),
  failure: require('./failure.svg'),
  warning: require('./warning.svg')
}

function DocumentFields({ fields = [], intl, onFieldChange }) {
  return (
    <ul className={CSS.fields}>
      {fields.map(field => (
        <React.Fragment>
          <li>
            <strong className={classNames(CSS.caption, 'text-secondary')}>
              {field.caption}
            </strong>
            <img
              className={CSS.icon}
              src={icons[field.status]}
              alt={field.status}
            />
            {field.editable && (
              <strong className={CSS.textEditableWrapper}>
                <TextEditable
                  text={field.value}
                  textClassName={CSS.textEditableText}
                  inputClassName={CSS.textEditableInput}
                  onSubmit={value =>
                    onFieldChange(field.docId, { id: field.id, value })
                  }
                />
              </strong>
            )}
            {!field.editable && <strong>{field.value}</strong>}
          </li>
        </React.Fragment>
      ))}
    </ul>
  )
}

export default injectIntl(DocumentFields)
