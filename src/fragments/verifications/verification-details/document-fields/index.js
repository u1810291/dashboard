import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextEditable from 'src/components/text-editable'
import classNames from 'classnames'
import CSS from './document-fields.scss'

const icons = {
  success: require('./success.svg'),
  failure: require('./failure.svg'),
  loading: require('./warning.svg'),
  warning: require('./warning.svg')
}

function DocumentFields({ fields = [], patchingFields = [], erroredFields = [], onFieldChange }) {
  return (
    <ul className={CSS.fields}>
      {fields.length === 0 && (
        <li className="text-secondary">
          <FormattedMessage id="fragments.verifications.verification_detail.no_data" />
        </li>
      )}
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <li>
            <span className={classNames(CSS.caption, 'text-secondary')}>{field.caption}</span>
            <img className={CSS.icon} src={icons[field.status]} alt={field.status} />
            {field.editable && (
              <span className={CSS.textEditableWrapper}>
                <TextEditable
                  text={field.value}
                  textClassName={CSS.textEditableText}
                  inputClassName={CSS.textEditableInput}
                  isLoading={patchingFields.find(
                    patchingField =>
                      patchingField.id === field.id && patchingField.docId === field.docId
                  )}
                  error={erroredFields.find(
                    erroredField =>
                      erroredField.id === field.id && erroredField.docId === field.docId
                  )}
                  onSubmit={value => onFieldChange(field.docId, { id: field.id, value })}
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

export default DocumentFields
