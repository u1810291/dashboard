import React from 'react'

export const photos = [
  {
    caption: 'Selfie',
    href:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/DSC_7424_%2834067852616%29.jpg/2560px-DSC_7424_%2834067852616%29.jpg'
  },
  {
    caption: 'Driving License',
    href:
      'https://upload.wikimedia.org/wikipedia/commons/3/3f/A_Licence_2013_Front.jpg'
  },
  {
    caption: 'National ID (front)',
    href: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/HunIDfront.jpg'
  },
  {
    caption: 'National ID (Back)',
    href: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/HunIDback.jpg'
  },
  {
    caption: 'Password',
    href:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Pasaporte-eua.jpg'
  }
]

export const documents = [
  {
    caption: 'Biometric & Background checks',
    fields: [
      {
        caption: 'Liveness',
        value: <span>Passed <span className="text-secondary">100%</span></span>,
        status: 'success'
      },
      {
        caption: 'Global watchlist',
        value: 'Manual review needed',
        status: 'warning'
      }
    ]
  },
  {
    caption: 'ID check',
    origin: 'National ID',
    fields: [
      {
        caption: 'Full name',
        value: 'Daniela Hernandez',
        status: 'success'
      },
      {
        caption: 'Address',
        value: 'Col Piedad Narvarte 03000 Benito Juarez, D.F.',
        status: 'success'
      },
      {
        caption: 'Date of birth',
        value: '19/10/1990',
        status: 'success'
      },
      {
        caption: 'date of emission',
        value: 'n/a',
        status: 'failure'
      }
    ]
  },
  {
    caption: 'ID check',
    origin: 'National ID',
    fields: [
      {
        caption: 'Full name',
        value: 'Daniela Hernandez',
        status: 'success'
      },
      {
        caption: 'Address',
        value: 'Col Piedad Narvarte 03000 Benito Juarez, D.F.',
        status: 'success'
      },
      {
        caption: 'Date of birth',
        value: '19/10/1990',
        status: 'success'
      },
      {
        caption: 'date of emission',
        value: 'n/a',
        status: 'failure'
      }
    ]
  },
  {
    caption: 'ID check',
    origin: 'Driving License',
    queued: true
  }
]
