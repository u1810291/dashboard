import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { difference, uniq } from 'lodash'
import CheckButton from 'src/components/check-button'
import CSS from './DocumentTypesStep.css'

const toggle = (array, element, addPredicate) => {
  const elements = [...array]
  const index = array.indexOf(element)
  addPredicate
    ? elements.push(element)
    : index > -1 && elements.splice(index, 1)
  return uniq(elements)
}

function DocumentTypesStep({
  availableDocumentTypes = [],
  mandatoryDocumentTypes = [],
  documents = [],
  onClick = () => {},
  intl
}) {
  let required = documents.required || []
  required = uniq(required.concat(mandatoryDocumentTypes))
  const optional = documents.optional || []

  const handleChange = ({ checked, indeterminate }, type) => {
    const documents = {
      required: difference(
        toggle(required, type, checked && !indeterminate),
        mandatoryDocumentTypes
      ),
      optional: toggle(optional, type, indeterminate)
    }
    onClick({ documents })
  }

  return (
    <div className="configure-flow-card">
      <h4>
        <FormattedMessage id="flow.documentTypeStep.title" />
      </h4>
      <div className={CSS.buttons}>
        {availableDocumentTypes.map(type => (
          <CheckButton
            allowIndeterminateState={!mandatoryDocumentTypes.includes(type)}
            checked={required.concat(optional).includes(type)}
            indeterminate={optional.includes(type)}
            onChange={state => handleChange(state, type)}
            key={type}
            label={intl.formatMessage({ id: `flow.documentTypeStep.${type}` })}
          />
        ))}
      </div>
      <p>
        <small className="text-secondary">
          {'* '}
          <input type="checkbox" disabled />{' '}
          <FormattedMessage id="flow.documentTypeStep.optionalHint" />
        </small>
      </p>
    </div>
  )
}

export default injectIntl(DocumentTypesStep)
