import React from 'react'
import { FormattedMessage } from 'react-intl'
import { compact } from 'lodash'
import Card from 'components/card'
import Items from 'components/items'
import SecurityCheckCollection from './security-check-collection'
import DocumentReadingStep from './document-reading-step'
import MexicanCurpValidationStep from './mexican-curp-validation-step'

export default function DocumentStep({
  document: { steps = [], country, type, region, photos = [] },
  countries
}) {
  const documentReadingStep = steps.find(s => s.id === 'document-reading')
  const curpValidationStep = steps.find(s => s.id === 'mexican-curp-validation')
  const securityCheckSteps = steps.filter(s =>
    [
      'template-matching',
      'alteration-detection',
      'watchlists',
      'facematch'
    ].includes(s.id)
  )

  const countryName =
    (countries.find(c => c.code === country) || {}).name || country

  return (
    <Card padding={4} templateColumns="5fr 4fr">
      <Items flow="row">
        <h2>
          <FormattedMessage
            id="DocumentStep.title"
            values={{
              document: (
                <FormattedMessage id={`flow.documentTypeStep.${type}`} />
              ),
              country: compact([countryName, region]).join(', ')
            }}
          />
        </h2>

        {securityCheckSteps && (
          <SecurityCheckCollection steps={securityCheckSteps} />
        )}

        {documentReadingStep && (
          <DocumentReadingStep step={documentReadingStep} />
        )}

        {curpValidationStep && (
          <MexicanCurpValidationStep step={curpValidationStep} />
        )}
      </Items>

      <Items gap={1}>
        {photos.map(photo => (
          <Card padding={0} shadow={0} key={photo}>
            <a href={photo} target="_blank" rel="noopener noreferrer">
              <img src={photo} alt={type} />
            </a>
          </Card>
        ))}
      </Items>
    </Card>
  )
}
