import { getSelfie, getPhotos, getDocuments } from './extractIdentityData'
import { FormattedMessage } from 'react-intl'
import React from 'react'

describe('.getSelfie', () => {
  it('should return null when gets null', () => {
    expect(getSelfie(null)).toBeNull()
  })

  it('should return null when gets null href', () => {
    let identity = {
      _embedded: {},
      _links: { photo: { href: null } }
    }
    expect(getSelfie(identity)).toBeNull()
  })

  it('should return selfie', () => {
    const stringHref = 's123123'
    const identity = {
      _links: { photo: { href: stringHref } }
    }
    const expected = {
      caption: <FormattedMessage id="verificationModal.fields.face" />,
      href: identity._links.photo.href + '.jpg?access_token=undefined'
    }
    expect(getSelfie(identity)).toEqual(expected)
  })
})

describe('.getPhotos', () => {
  it('should return photos', () => {
    let sides = ['front', 'back']
    const identity = {
      _embedded: {},
      documents: [
        {
          type: 'type1',
          metadata: { sides },
          pictures: [
            {
              _links: { file: { href: 'hrefString' } }
            },
            {
              _links: { file: { href: 'hrefString2' } }
            }
          ]
        },
        {
          type: 'type2',
          metadata: { sides },
          pictures: [
            {
              _links: { file: { href: 'hrefString3' } }
            }
          ]
        }
      ]
    }
    const expected = [
      {
        caption: (
          <span>
            <FormattedMessage id="verificationModal.fields.type1" /> ({sides[0]})
          </span>
        ),
        href: 'hrefString?access_token=undefined'
      },
      {
        caption: (
          <span>
            <FormattedMessage id="verificationModal.fields.type1" /> ({sides[1]})
          </span>
        ),
        href: 'hrefString2?access_token=undefined'
      },
      {
        caption: (
          <span>
            <FormattedMessage id="verificationModal.fields.type2" /> ({sides[0]})
          </span>
        ),
        href: 'hrefString3?access_token=undefined'
      }
    ]

    expect(getPhotos(identity)).toEqual(expected)
  })
})

describe('.getDocuments', () => {
  it('should return documents', () => {
    const identity = {
      alive: true,
      fullName: 'Name',
      watchlists: { interpol: false, ofac: true },
      documents: [
        {
          id: '001a',
          type: 'driving-lisense',
          status: 'processing',
          fields: []
        },
        {
          id: '001b',
          type: 'passport',
          status: 'ready',
          fields: [{ id: 'name', value: 'FIELD_NOT_VISIBLE' }, { id: 'address', value: 'Mexico' }]
        }
      ],
      _embedded: {}
    }
    const watchlists = true
    const expected = [
      {
        caption: <FormattedMessage id="verificationModal.backgroundCheck" />,
        fields: [
          {
            caption: <FormattedMessage id="verificationModal.backgroundCheck.globalWatchlists" />,
            value: (
              <FormattedMessage
                id={`verificationModal.backgroundCheck.${watchlists ? 'failed' : 'passed'}`}
              />
            ),
            status: watchlists ? 'warning' : 'success'
          }
        ]
      },
      {
        caption: <FormattedMessage id="verificationModal.idcheck" />,
        origin: <FormattedMessage id="verificationModal.fields.driving-lisense" />,
        inProgress: true,
        fields: []
      },
      {
        caption: <FormattedMessage id="verificationModal.idcheck" />,
        origin: <FormattedMessage id="verificationModal.fields.passport" />,
        inProgress: false,
        fields: [
          {
            caption: <FormattedMessage id="identities.fields.name" />,
            value: <FormattedMessage id="verificationModal.n-a" />,
            status: 'failure',
            editable: true,
            id: 'name',
            docId: '001b'
          },
          {
            caption: <FormattedMessage id="identities.fields.address" />,
            value: 'Mexico',
            status: 'success',
            editable: true,
            id: 'address',
            docId: '001b'
          }
        ]
      },
      {
        caption: <FormattedMessage id="verificationModal.liveness" />,
        fields: [
          {
            caption: <FormattedMessage id="verificationModal.liveness.livenessCheck" />,
            value: <FormattedMessage id={`verificationModal.backgroundCheck.${'passed'}`} />,
            status: 'success'
          }
        ]
      }
    ]
    expect(getDocuments(identity)).toEqual(expected)
  })
})
