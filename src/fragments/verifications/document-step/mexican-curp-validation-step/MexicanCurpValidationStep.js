import React from 'react'
import { FormattedMessage } from 'react-intl'
import Details from 'src/components/details'
import Spinner from 'src/components/spinner'
import Items from 'src/components/items'
import DocumentReadingStep from '../document-reading-step'

function Success({ step }) {
  const summary = <FormattedMessage id="MexicanCurpValidationStep.title" />
  return (
    <Details summary={summary} inline justifyItems="start">
      <DocumentReadingStep step={step} />
    </Details>
  )
}

function InProgress() {
  return (
    <Items gap={1} inline align="center" justifyContent="start">
      <strong>
        <FormattedMessage id="MexicanCurpValidationStep.title" />
      </strong>
      <Spinner />
    </Items>
  )
}

function Error({ error }) {
  return (
    <Items gap={1} inline>
      <strong>
        <FormattedMessage id="MexicanCurpValidationStep.title" />:
      </strong>
      <span className="text-error">{error.message}</span>
    </Items>
  )
}

export default function MexicanCurpValidationStep({ step }) {
  if (step.error) {
    return <Error error={step.error} />
  }
  if (step.status === 200) {
    return <Success step={step} />
  }
  if (step.status !== 200) {
    return <InProgress />
  }
}
