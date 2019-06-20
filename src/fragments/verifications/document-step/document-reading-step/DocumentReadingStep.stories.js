import React from 'react'
import { storiesOf } from '@storybook/react'
import DocumentReadingStep from '.'
import Card from 'components/card'

const stories = storiesOf(
  'fragments/verifications/DocumentStep/DocumentReadingStep',
  module
)

const data = {
  fullName: { value: 'RASTYAGAEV VADIM ' },
  documentNumber: { value: '278691410' },
  dateOfBirth: { value: '31|12|1984' },
  emissionDate: { value: '18-09-2015' },
  fieldWithNoName: { value: null }
}

stories.add('Success', () => (
  <Card>
    <DocumentReadingStep step={{ data, status: 200 }} />
  </Card>
))
stories.add('In Progress', () => (
  <Card>
    <DocumentReadingStep step={{ data, status: 100 }} />
  </Card>
))
stories.add('Error', () => (
  <Card>
    <DocumentReadingStep
      step={{ data, status: 200, error: { message: 'Test error message' } }}
    />
  </Card>
))
