import React from 'react'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'

const percents = val => (parseInt(val, 10) || 0 * 100).toFixed(0) + '%'

const SUSPICIOUS_FACEMATCH_LEVEL = 59

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

  const backgroundCheck = {
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
      }
    ]
  }

  if (identity.status !== 'unverified') {
    backgroundCheck.fields.push({
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
    })
  }

  documents.push(backgroundCheck)

  if (identity.documents) {
    identity.documents.forEach(doc => {
      if (doc.pictures && doc.pictures.length) {
        photos.push({
          caption: (
            <FormattedMessage id={`verifirationModal.fields.${doc.type}`} />
          ),
          href: doc.pictures[0]._links.file.href
        })
      }

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
          caption: <FormattedMessage id="verifirationModal.idcheck" />,
          origin: (
            <FormattedMessage id={`verifirationModal.fields.${doc.type}`} />
          ),
          via: <FormattedMessage id={'verifirationModal.govChecks'} />,
          queued: doc.status === 'queued',
          fields: doc.verifiedData.map(field => ({
            caption: <FormattedMessage id={`identities.fields.${field.id}`} />,
            value: detectError(field.value) ? (
              <FormattedMessage id="verifirationModal.n-a" />
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
