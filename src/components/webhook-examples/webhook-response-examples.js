export const WEBHOOK_RESPONSE = {
  event: 'summary',
  liveness: true,
  metadata: {
    user_id: '47435091283',
    name: 'John'
  },
  dateCreated: '2018-11-09T01:33:14.465Z',
  dateUpdated: '2018-11-09T01:34:18.153Z',
  watchlists: [],
  documents: [
    {
      facematch: true,
      type: 'passport',
      fields: [
        {
          id: 'dateOfBirth',
          value: '09/11/1988',
          error: null
        },
        {
          id: 'expiry',
          value: '16/08/2022',
          error: null
        },
        {
          id: 'country',
          value: 'UNITED STATES OF AMERICA',
          error: null
        },
        {
          id: 'documentNumber',
          value: 'H22912324',
          error: null
        },
        {
          id: 'emission',
          value: '16/08/2016',
          error: null
        },
        {
          id: 'fullName',
          value: 'John Smith',
          error: null
        }
      ],
      errors: [],
      _links: {
        identity: {
          href:
            'http://globalid.mati.io/v1/identities/5be4faca799d082f3299e241',
          'resource-type': 'identity'
        },
        pictures: {
          href:
            'http://globalid.mati.io/v1/documents/5be4fae9799d082f3299e248/pictures',
          'resource-type': 'picture'
        },
        self: {
          href: 'http://globalid.mati.io/v1/documents/5be4fae9799d082f3299e248',
          'resource-type': 'document'
        }
      }
    },
    {
      facematch: true,
      type: 'national-id',
      fields: [
        {
          id: 'address',
          value: 'Lombard street 1421, CA 94111',
          error: null
        },
        {
          id: 'dateOfBirth',
          value: '09/11/1988',
          error: null
        },
        {
          id: 'expiry',
          value: '31/12/2026',
          error: null
        },
        {
          id: 'country',
          value: 'UNITED STATES OF AMERICA',
          error: null
        },
        {
          id: 'documentNumber',
          value: '1740336654',
          error: null
        },
        {
          id: 'emission',
          value: '31/12/2016',
          error: null
        },
        {
          id: 'fullName',
          value: 'JOHN SMITH',
          error: null
        }
      ],
      errors: [],
      _links: {
        identity: {
          href:
            'http://globalid.mati.io/v1/identities/5be4faca799d082f3299e241',
          'resource-type': 'identity'
        },
        pictures: {
          href:
            'http://globalid.mati.io/v1/documents/5be4fae9799d082f3299e248/pictures',
          'resource-type': 'picture'
        },
        self: {
          href: 'http://globalid.mati.io/v1/documents/5be4fae9799d082f3299e248',
          'resource-type': 'document'
        }
      }
    },
    {
      facematch: true,
      type: 'driving-license',
      fields: [
        {
          id: 'dateOfBirth',
          value: '09/11/1988',
          error: null
        },
        {
          id: 'expiry',
          value: '31/12/2015',
          error: null
        },
        {
          id: 'country',
          value: 'UNITED STATES OF AMERICA',
          error: null
        },
        {
          id: 'documentNumber',
          value: 'N9932321',
          error: null
        },
        {
          id: 'emission',
          value: '31/07/2012',
          error: null
        },
        {
          id: 'fullName',
          value: 'JOHN SMITH',
          error: null
        }
      ],
      errors: [],
      _links: {
        identity: {
          href:
            'http://globalid.mati.io/v1/identities/5be4faca799d082f3299e241',
          'resource-type': 'identity'
        },
        pictures: {
          href:
            'http://globalid.mati.io/v1/documents/5be4fae9799d082f3299e248/pictures',
          'resource-type': 'picture'
        },
        self: {
          href: 'http://globalid.mati.io/v1/documents/5be4fae9799d082f3299e248',
          'resource-type': 'document'
        }
      }
    },
    {
      facematch: true,
      type: 'proof-of-residency',
      fields: [
        {
          id: 'address',
          value: 'Lombard street 1421, CA 94111',
          error: null
        },
        {
          id: 'expiry',
          value: '23/02/2018',
          error: null
        },
        {
          id: 'emission',
          value: '07/12/2017',
          error: null
        },
        {
          id: 'fullName',
          value: 'JOHN SMITH',
          error: null
        }
      ],
      errors: [],
      _links: {
        identity: {
          href:
            'http://globalid.mati.io/v1/identities/5be4faca799d082f3299e241',
          'resource-type': 'identity'
        },
        pictures: {
          href:
            'http://globalid.mati.io/v1/documents/5be4fae6799d082f3299e245/pictures',
          'resource-type': 'picture'
        },
        self: {
          href: 'http://globalid.mati.io/v1/documents/5be4fae6799d082f3299e245',
          'resource-type': 'document'
        }
      }
    }
  ],
  links: {
    documents: {
      href:
        'http://globalid.mati.io/v1/identities/5be4e3c218ccec149fbb9487/documents',
      'resource-type': 'document'
    },
    photo: {
      href: 'http://globalid.mati.io/v1/photos/5be4e41018ccec149fbb948f',
      'resource-type': 'picture'
    },
    faces: {
      href:
        'http://globalid.mati.io/v1/identities/5be4e3c218ccec149fbb9487/faces',
      'resource-type': 'face'
    },
    self: {
      href: 'http://globalid.mati.io/v1/identities/5be4e3c218ccec149fbb9487',
      'resource-type': 'identity'
    }
  }
}

export const WEBHOOK_RESPONSE_WATCHLISTS = Object.assign({}, WEBHOOK_RESPONSE, {
  watchlists: ['un', 'ofac', 'interpol']
})

export const WEBHOOK_RESPONSE_FACEMATCH = Object.assign({}, WEBHOOK_RESPONSE, {
  documents: [
    Object.assign({}, WEBHOOK_RESPONSE.documents[0], { facematch: false })
  ]
})

export const WEBHOOK_RESPONSE_LIVENESS = Object.assign({}, WEBHOOK_RESPONSE, {
  liveness: false
})

export const WEBHOOK_RESPONSE_OCR = Object.assign({}, WEBHOOK_RESPONSE, {
  documents: [
    {
      facematch: false,
      type: 'passport',
      value: null,
      error: { code: 'not.visible', message: 'Field is not visible' }
    }
  ]
})
