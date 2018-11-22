import React from 'react'
import { FormattedMessage } from 'react-intl'
import Label from 'src/components/label'

const DOCUMENT_TYPE_COLORS = {
  liveness: 'blue',
  passport: 'orange',
  'national-id': 'green',
  'driving-license': 'red',
  'proof-of-residency': 'yellow'
}

export default function TypeLabel({ type }) {
  return (
    <Label labelStyle={`${DOCUMENT_TYPE_COLORS[type]}`}>
      <FormattedMessage id={`flow.documentTypeStep.${type}`} />
    </Label>
  )
}
