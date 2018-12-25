import React from 'react'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'

const percents = val => (parseInt(val, 10) || 0 * 100).toFixed(0) + '%'

const SUSPICIOUS_FACEMATCH_LEVEL = 70

function detectError(string) {
  return !string || !!string.match(/^([A-Z]+_[A-Z]+)+$/)
}

export default function extractIdentityData(identity) {
  const photos = []
  const documents = []
  const watchlists = identity.watchlists
    ? Object.values(identity.watchlists).some(list => list.length)
    : false

  if (get(identity, '_links.photo.href')) {
    photos.push({
      caption: <FormattedMessage id="verifirationModal.fields.face" />,
      href: identity._links.photo.href + '.jpg'
    })
  }

  documents.push({
    caption: <FormattedMessage id="verifirationModal.backgroundCheck" />,
    fields: [
      {
        caption: (
          <FormattedMessage id="verifirationModal.backgroundCheck.liveness" />
        ),
        value: (
          <FormattedMessage
            id={`verifirationModal.backgroundCheck.${
              identity.alive ? 'passed' : 'failed'
            }`}
          />
        ),
        status: identity.alive ? 'success' : 'warning'
      },
      {
        caption: (
          <FormattedMessage id="verifirationModal.backgroundCheck.globalWatchlists" />
        ),
        value: (
          <FormattedMessage
            id={`verifirationModal.backgroundCheck.${
              watchlists ? 'failed' : 'passed'
            }`}
          />
        ),
        status: watchlists ? 'warning' : 'success'
      }
    ]
  })

  if (identity.documents) {
    identity.documents.forEach(doc => {
      photos.push({
        caption: (
          <FormattedMessage id={`verifirationModal.fields.${doc.type}`} />
        ),
        href: doc.pictures[0]._links.file.href
      })

      const document = {
        caption: <FormattedMessage id="verifirationModal.idcheck" />,
        origin: (
          <FormattedMessage id={`verifirationModal.fields.${doc.type}`} />
        ),
        queued: doc.status === 'queued',
        fields: doc.fields.map(field => ({
          caption: <FormattedMessage id={`identities.fields.${field.id}`} />,
          value: detectError(field.value) ? (
            <FormattedMessage id="verifirationModal.n-a" />
          ) : (
            field.value
          ),
          status: detectError(field.value) ? 'failure' : 'success'
        }))
      }

      if (doc.faceMatchScore) {
        document.fields.unshift({
          caption: <FormattedMessage id="identities.fields.faceMatch" />,
          value: percents(doc.faceMatchScore),
          status:
            parseInt(doc.faceMatchScore, 10) > SUSPICIOUS_FACEMATCH_LEVEL
              ? 'success'
              : 'warning'
        })
      }

      documents.push(document)
    })
  }

  return { documents, photos }
}
