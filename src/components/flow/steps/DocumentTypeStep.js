import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Card } from 'mgi-ui-components'
import CSS from './steps.css'
import icons from './document-type-icons'
// import

export default function DocumentTypeStep({
  availableDocumentTypeIDs = [
    'face',
    'driving-license',
    'national-id',
    'passport',
    'proof-of-residency'
  ]
}) {
  return (
    <div className="configure-flow-card">
      <h3>
        <FormattedMessage id="flow.documentTypeStep.title" />
      </h3>
      <div className={CSS.flowCards}>
        {availableDocumentTypeIDs.map(type => (
          <Card
            className={classNames(
              CSS.flowCard,
              CSS.documentTypeCard,
              'text-secondary',
              'text-caption'
            )}
            // onClick={this.handleCardClick.bind(this, type)}
          >
            <img src={icons[type]} alt=""/>
            <FormattedMessage id={`flow.documentTypeStep.${type}`} />
          </Card>
        ))}
      </div>
    </div>
  )
}
