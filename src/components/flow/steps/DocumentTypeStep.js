import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Card } from 'mgi-ui-components'
import CSS from './steps.css'
import icons from './document-type-icons'

const flatten = array => array.reduce((acc, val) => acc.concat(val), [])
const toggle = (array, element) => {
  const elements = [...array]
  const index = elements.indexOf(element)
  index === -1 ? elements.push(element) : elements.splice(index, 1)
  return elements

}

export default function DocumentTypeStep({
  availableDocumentTypes = [],
  documents = [],
  onClick = () => {}
}) {
  return (
    <div className="configure-flow-card">
      <h3>
        <FormattedMessage id="flow.documentTypeStep.title" />
      </h3>
      <div className={CSS.flowCards}>
        {availableDocumentTypes.map(type => (
          <Card
            cardBorderStyle={flatten(documents).includes(type) ? 'blue' : 'default'}
            key={type}
            className={classNames(
              CSS.flowCard,
              CSS.documentTypeCard,
              'text-secondary',
              'text-caption'
            )}
            onClick={() => onClick({ documents: toggle(flatten(documents), type).map(e => [e]) })}
          >
            <img src={icons[type]} alt=""/>
            <FormattedMessage id={`flow.documentTypeStep.${type}`} />
          </Card>
        ))}
      </div>
    </div>
  )
}
