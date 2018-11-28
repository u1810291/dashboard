import React from 'react'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'

const percents = val => (parseInt(val, 10) || 0 * 100).toFixed(0) + '%'

const SUSPICIOUS_FACEMATCH_LEVEL = 70

export default function extractIdentityData(identity) {
  const photos = []
  const documents = []

  if (get(identity, '_links.photo.href')) {
    photos.push({
      caption: <FormattedMessage id="verifirationModal.fields.face" />,
      href: identity._links.photo.href + '.jpg'
    })
  }

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
        fields: doc.fields.map(field => ({
          caption: <FormattedMessage id={`identities.fields.${field.id}`} />,
          value: field.value,
          status: doc.status
        }))
      }

      const faceMatchValue = (identity.facematchScore.find(
        s => s[0] === doc.type
      ) || [])[1]

      document.fields.unshift({
        caption: <FormattedMessage id="identities.fields.faceMatch" />,
        value: percents(faceMatchValue),
        status:
          parseInt(faceMatchValue, 10) > SUSPICIOUS_FACEMATCH_LEVEL
            ? 'ready'
            : 'warning'
      })

      documents.push(document)
    })
  }

  return { documents, photos }
}
