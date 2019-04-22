import React from 'react'
import { storiesOf } from '@storybook/react'
import DrivingLicenseStep from '.'

const stories = storiesOf('fragments/verifications/DocumentStep', module)

const success = {
  photos: [
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Passport_card.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Ppt_card_back.jpg'
  ],
  steps: [
    {
      id: 'document-reading',
      status: 200,
      data: {
        fullName: { value: 'RASTYAGAEV VADIM ' },
        documentNumber: { value: '278691410' },
        dateOfBirth: { value: '31|12|1984' },
        emissionDate: { value: '18-09-2015' },
        fieldWithNoName: { value: null }
      }
    },
    {
      id: 'mexican-curp-validation',
      status: 200,
      data: {
        fullName: { value: 'RASTYAGAEV VADIM ' },
        documentNumber: { value: '278691410' },
        dateOfBirth: { value: '31|12|1984' },
        emissionDate: { value: '18-09-2015' },
        fieldWithNoName: { value: null }
      }
    },
    {
      id: 'facematch',
      status: 200
    },
    {
      id: 'watchlists',
      status: 200,
      error: true
    },
    {
      id: 'alteration-detection',
      status: 200
    },
    {
      id: 'template-matching',
      status: 200
    }
  ],
  type: 'national-id',
  country: 'MX'
}

const inProgress = {
  photos: [
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Passport_card.jpg'
  ],
  steps: [
    {
      id: 'document-reading',
      status: 100
    },
    {
      id: 'mexican-curp-validation',
      status: 100
    },
    {
      id: 'facematch',
      status: 200
    },
    {
      id: 'watchlists',
      status: 200,
      error: true
    },
    {
      id: 'alteration-detection',
      status: 100
    },
    {
      id: 'template-matching',
      status: 100
    }
  ],
  type: 'national-id',
  country: 'US',
  region: 'CA'
}

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'MX', name: 'Mexico' }
]

stories.add('Success', () => (
  <DrivingLicenseStep document={success} countries={countries} />
))

stories.add('In Progress', () => (
  <DrivingLicenseStep document={inProgress} countries={countries} />
))
