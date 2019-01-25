import React from 'react'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'

const percents = val => (parseInt(val, 10) || 0 * 100).toFixed(0) + '%'

const SUSPICIOUS_FACEMATCH_LEVEL = 59

function detectError(string) {
  return !string || !!string.toString().match(/^([A-Z]+_[A-Z]+)+$/)
}

export default function extractIdentityData(identity) {
  const photos = []
  const documents = []
  const watchlists = identity.watchlists
    ? Object.values(identity.watchlists).some(list => list.length)
    : false

  if (get(identity, '_links.photo.href')) {
    photos.push({
      caption: <FormattedMessage id="verificationModal.fields.face" />,
      href: identity._links.photo.href + '.jpg'
    })
  }

  const backgroundCheck = {
    caption: <FormattedMessage id="verificationModal.backgroundCheck" />,
    fields: [
      {
        caption: (
          <FormattedMessage id="verificationModal.backgroundCheck.liveness" />
        ),
        value: (
          <FormattedMessage
            id={`verificationModal.backgroundCheck.${
              identity.alive ? 'passed' : 'failed'
            }`}
          />
        ),
        status: identity.alive ? 'success' : 'warning'
      }
    ]
  }

  if (identity.fullName) {
    backgroundCheck.fields.push({
      caption: (
        <FormattedMessage id="verificationModal.backgroundCheck.globalWatchlists" />
      ),
      value: (
        <FormattedMessage
          id={`verificationModal.backgroundCheck.${
            watchlists ? 'failed' : 'passed'
          }`}
        />
      ),
      status: watchlists ? 'warning' : 'success'
    })
  }

  documents.push(backgroundCheck)

  if (identity.documents) {
    identity.documents.forEach(doc => {
      if (doc.pictures && doc.pictures.length) {
        photos.push({
          caption: (
            <FormattedMessage id={`verificationModal.fields.${doc.type}`} />
          ),
          href: doc.pictures[0]._links.file.href
        })
      }

      const document = {
        caption: <FormattedMessage id="verificationModal.idcheck" />,
        origin: (
          <FormattedMessage id={`verificationModal.fields.${doc.type}`} />
        ),
        queued: ['queued', 'processing'].includes(doc.status),
        fields: doc.fields
          .filter(field => field.id !== 'docError')
          .map(field => ({
            caption: <FormattedMessage id={`identities.fields.${field.id}`} />,
            value: detectError(field.value) ? (
              <FormattedMessage id="verificationModal.n-a" />
            ) : (
              field.value
            ),
            status: detectError(field.value) ? 'failure' : 'success',
            editable: true,
            id: field.id,
            docId: doc.id
          }))
      }

      if (doc.facematchScore) {
        document.fields.unshift({
          caption: <FormattedMessage id="identities.fields.faceMatch" />,
          value: percents(doc.facematchScore),
          status:
            parseInt(doc.facematchScore, 10) > SUSPICIOUS_FACEMATCH_LEVEL
              ? 'success'
              : 'warning'
        })
      }

      documents.push(document)

      if (doc.verifiedData && doc.verifiedData.length) {
        const verifiedDocument = {
          caption: <FormattedMessage id="verificationModal.idcheck" />,
          origin: (
            <FormattedMessage id={`verificationModal.fields.${doc.type}`} />
          ),
          via: <FormattedMessage id={'verificationModal.govChecks'} />,
          queued: ['queued', 'processing'].includes(doc.status),
          fields: doc.verifiedData.map(field => ({
            caption: <FormattedMessage id={`identities.fields.${field.id}`} />,
            value: detectError(field.value) ? (
              <FormattedMessage id="verificationModal.n-a" />
            ) : (
              field.value
            ),
            status: detectError(field.value) ? 'failure' : 'success'
          }))
        }

        documents.push(verifiedDocument)
      }
    })
  }

  return { documents, photos }
}
