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
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <li>
            <span className={classNames(CSS.caption, 'text-secondary')}>
              {field.caption}
            </span>
            <img
              className={CSS.icon}
              src={icons[field.status]}
              alt={field.status}
            />
            {field.editable && (
              <span className={CSS.textEditableWrapper}>
                <TextEditable
                  text={field.value}
                  textClassName={CSS.textEditableText}
                  inputClassName={CSS.textEditableInput}
                  onSubmit={value =>
                    onFieldChange(field.docId, { id: field.id, value })
                  }
                />
              </span>
            )}
            {!field.editable && <span>{field.value}</span>}
          </li>
        </React.Fragment>
      ))}
    </ul>
  )
}

export default injectIntl(DocumentFields)
