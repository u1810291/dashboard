import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import classNames from 'classnames'
import { difference, uniq, without } from 'lodash'
import Card from 'src/components/card'
import BooleanField from 'src/components/boolean-field'
import CSS from './steps.css'
import icons from './document-type-icons'

const mandatoryTypes = ['face']

const toggle = (array, element, addPredicate) => {
  const elements = [...array]
  const index = array.indexOf(element)
  addPredicate ? elements.push(element) : elements.splice(index, 1)
  return uniq(elements)
}

function DocumentTypeStep({
  availableDocumentTypes = [],
  documents = [],
  onClick = () => {},
  intl
}) {
  let required = documents.required || []
  required = uniq(required.concat(mandatoryTypes))
  const optional = documents.optional || []

  return (
    <div className="configure-flow-card">
      <p>
        <FormattedMessage id="flow.documentTypeStep.title" />
      </p>
      <div className={CSS.flowCards}>
        {availableDocumentTypes.map(type => (
          <Card
            cardBorderStyle={required.concat(optional).includes(type) ? 'selected' : 'default'}
            key={type}
            className={classNames(CSS.flowCard, CSS.documentTypeCard)}
            onClick={() => {
              onClick({
                documents: {
                  required: difference(
                    toggle(required, type, !required.concat(optional).includes(type)),
                    mandatoryTypes
                  ),
                  optional: without(optional, type)
                }
              })
            }}
          >
            <img src={icons[type]} alt="" />
            <span className={classNames(CSS.documentTypeName, 'text-secondary', 'text-caption')}>
              <FormattedMessage id={`flow.documentTypeStep.${type}`} />
            </span>
            <small className="text-secondary">
              <BooleanField
                label={intl.formatMessage({ id: 'flow.documentTypeStep.optional' })}
                checked={optional.includes(type)}
                onClick={event => event.stopPropagation()}
                onChange={event => {
                  const { checked } = event.target
                  onClick({
                    documents: {
                      required: toggle(required, type, !checked),
                      optional: toggle(optional, type, checked)
                    }
                  })
                }}
                hidden={!required.concat(optional).includes(type) || mandatoryTypes.includes(type)}
              />
            </small>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default injectIntl(DocumentTypeStep)
