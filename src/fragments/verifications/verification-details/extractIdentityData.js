import React from 'react'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'

const percents = val => (parseInt(val, 10) || 0 * 100).toFixed(0) + '%'

const SUSPICIOUS_FACEMATCH_LEVEL = 59

function detectError(string) {
  return !string || !!string.toString().match(/^([A-Z]+_[A-Z]+)+$/)
}

export function getSelfie(identity) {
  return (get(identity, '_links.photo.href')) ? {
    caption: <FormattedMessage id="verificationModal.fields.face" />,
    href: identity._links.photo.href + '.jpg'
  } : null
}

function getLivenessCheck(identity) {
  return {
    caption: <FormattedMessage id="verificationModal.liveness" />,
    fields: [
      {
        caption: <FormattedMessage id="verificationModal.liveness.livenessCheck" />,
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
}

function getBackgroundCheck(identity) {
  const watchlists = identity.watchlists
    ? Object.values(identity.watchlists).some(list => list.length)
    : false
  return {
    caption: <FormattedMessage id="verificationModal.backgroundCheck" />,
    fields: [
      {
        caption: <FormattedMessage id="verificationModal.backgroundCheck.globalWatchlists" />,
        value: (
          <FormattedMessage id={`verificationModal.backgroundCheck.${
            watchlists ? 'failed' : 'passed'}`}
          />
        ),
        status: watchlists ? 'warning' : 'success'
      }
    ]
  }
}

export function getPhotos(identity) {
  let photos = []
  identity.documents && identity.documents.forEach(doc => {
    doc.pictures && doc.pictures.length && doc.pictures.forEach((photo, index) => {
      photos.push({
        caption: (
          <span>
            <FormattedMessage id={`verificationModal.fields.${doc.type}`}/>{' '}
            ({doc.metadata.sides[index]})
          </span>
        ),
        href: photo._links.file.href
      })
    })
  })
  return photos
}

function getFacematchScore(doc) {
  return {
    caption: <FormattedMessage id="identities.fields.faceMatch" />,
    value: percents(doc.facematchScore),
    status: parseInt(doc.facematchScore, 10) > SUSPICIOUS_FACEMATCH_LEVEL
      ? 'success'
      : 'warning'
  }
}

function getVerifiedDocument(doc) {
  return {
    caption: <FormattedMessage id="verificationModal.idcheck" />,
    origin: <FormattedMessage id={`verificationModal.fields.${doc.type}`} />,
    via: <FormattedMessage id={'verificationModal.govChecks'} />,
    queued: doc.verifiedData.length === 0,
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
}

function getFields(doc) {
  let fields = doc.fields
    .filter(field => field.id !== 'docError')
    .map(field => ({
      caption: <FormattedMessage id={`identities.fields.${field.id}`} />,
      value: detectError(field.value) ? (
        <FormattedMessage id="verificationModal.n-a" />
      ) : field.value,
      status: detectError(field.value) ? 'failure' : 'success',
      editable: true,
      id: field.id,
      docId: doc.id
    }))

  if (doc.facematchScore) {
    fields.unshift(getFacematchScore(doc))
  }
  return fields
}

export function getDocuments(identity) {
  const documents = []
  identity.fullName && documents.push(getBackgroundCheck(identity))

  identity.documents && identity.documents.forEach(doc => {
    documents.push({
      caption: <FormattedMessage id="verificationModal.idcheck" />,
      origin: <FormattedMessage id={`verificationModal.fields.${doc.type}`} />,
      queued: doc.fields.length === 0,
      fields: getFields(doc)
    })

    // TODO: wait untill better statuses on backend and fix this
    if (doc.verifiedData && doc.type === 'national-id' && get(doc, 'metadata.country') === 'MX') {
      documents.push(getVerifiedDocument(doc))
    }
  })

  documents.push(getLivenessCheck(identity))
  return documents
}
