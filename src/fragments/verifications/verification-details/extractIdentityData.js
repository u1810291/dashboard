import React from 'react'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'
import { authorizedUrl } from 'src/lib/client/http'

const percents = val => (parseInt(val, 10) || 0 * 100).toFixed(0) + '%'

const SUSPICIOUS_FACEMATCH_LEVEL = 59

function detectError(string) {
  return !string || !!string.toString().match(/^([A-Z]+_[A-Z]+)+$/)
}

export function getSelfie(identity, token) {
  if (get(identity, '_embedded.verification.steps[0].status') === 0) return {
    error: true
  }
  if (get(identity, '_embedded.verification.steps[0].data.selfieUrl')) {
    return get(identity, '_embedded.verification.steps[0].data.selfieUrl')
      ? {
        caption: <FormattedMessage id="verificationModal.fields.face" />,
        href: identity._embedded.verification.steps[0].data.selfieUrl
      }
      : null
  }

  // For old identites, without _embedded
  return get(identity, '_links.photo.href')
    ? {
        caption: <FormattedMessage id="verificationModal.fields.face" />,
        href: authorizedUrl(identity._links.photo.href + '.jpg', token)
      }
    : null
}

function getLivenessCheck(identity) {
  if (identity._embedded.verification && identity._embedded.verification.documents) {
    let statusCode = identity._embedded.verification.steps[0].status
    let result
    let status
    if (statusCode === 100) {
      result = 'loading'
      status = 'loading'
    }
    else if (statusCode === 200) {
      result = 'passed'
      status = 'success'
    }
    else {
      result = 'failed'
      status = 'failure'
    }
    return {
      caption: <FormattedMessage id="verificationModal.liveness" />,
      fields: [
        {
          caption: <FormattedMessage id="verificationModal.liveness.livenessCheck" />,
          value: (
            <FormattedMessage
              id={`verificationModal.backgroundCheck.${result}`}
            />
          ),
          status: status
        }
      ]
    }
  }

  // For old identites, without _embedded
  return {
    caption: <FormattedMessage id="verificationModal.liveness" />,
    fields: [
      {
        caption: <FormattedMessage id="verificationModal.liveness.livenessCheck" />,
        value: (
          <FormattedMessage
            id={`verificationModal.backgroundCheck.${identity.alive ? 'passed' : 'failed'}`}
          />
        ),
        status: identity.alive ? 'success' : 'warning'
      }
    ]
  }
}

function getBackgroundCheck(identity) {
  const watchlists = identity.watchlists
    ? Object.values(identity.watchlists).some(value => value)
    : false
  return {
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
  }
}

export function getPhotos(identity, token) {
  let photos = []
  if (identity._embedded.verification && identity._embedded.verification.documents) {
    identity._embedded.verification.documents.forEach(doc => {
      doc.photos.forEach(photo => {
        photos.push({
          caption: (
            <FormattedMessage id={`verificationModal.fields.${doc.type}`} />
          ),
          href: photo
        })
      })
    })
    return photos
  }

  // For old identites, without _embedded
  identity.documents &&
  identity.documents.forEach(doc => {
    doc.pictures &&
    doc.pictures.length &&
    doc.pictures.forEach((photo, index) => {
      photos.push({
        caption: (
          <span>
            <FormattedMessage id={`verificationModal.fields.${doc.type}`} /> (
            {doc.metadata.sides[index]})
          </span>
        ),
        href: authorizedUrl(photo._links.file.href, token)
      })
    })
  })
  return photos
}

function getFacematchScore(doc) {
  return {
    caption: <FormattedMessage id="identities.fields.faceMatch" />,
    value: percents(doc.facematchScore),
    status: parseInt(doc.facematchScore, 10) > SUSPICIOUS_FACEMATCH_LEVEL ? 'success' : 'warning'
  }
}

function getVerifiedDocument(doc) {
  return {
    caption: <FormattedMessage id="verificationModal.idcheck" />,
    origin: <FormattedMessage id={`verificationModal.fields.${doc.type}`} />,
    via: <FormattedMessage id={'verificationModal.govChecks'} />,
    inProgress: doc.verifiedData.length === 0,
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
      ) : (
        field.value
      ),
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

function getFieldsFromSteps(doc) {
  let fields = []
  doc.steps.forEach(step => {
    if (step.id === 'document-reading') {
      if (step.status !== 200 || step.error) {
        fields.push({
          caption: <FormattedMessage id={'identities.fields.document-reading'} />,
          value: getStepValue(step),
          status: getStatusValue(step)
        })
      } else {
        Object.entries(step.data).forEach(entry => {
          fields.push({
            caption: <FormattedMessage id={`identities.fields.${entry[0]}`} />,
            value: entry[1].value,
            status: 'success'
          })
        })
      }
    } else {
      fields.push({
        caption: <FormattedMessage id={`identities.fields.${step.id}`} />,
        value: getStepValue(step),
        status: getStatusValue(step)
      })
    }
  })
  return fields
}

function getStatusValue(step) {
  if (step.status === 100) {
    return 'loading'
  }
  if (step.status === 400) {
    return 'failure'
  }
  if (step.error) {
    return 'failure'
  }
  return 'success'
}

function getStepValue(step) {
  if (step.status === 100) {
    return (step.error && step.error.message) ||
      <FormattedMessage id="identities.fields.value.loading" />
  }
  if (step.status === 200) {
    return (step.error && step.error.message) ||
      <FormattedMessage id="identities.fields.value.passed" />
  }
}

export function getDocuments(identity) {
  const documents = []
  if (identity._embedded.verification && identity._embedded.verification.documents) {
    documents.push(getLivenessCheck(identity))
    identity._embedded.verification.documents.forEach(doc => {
      documents.push({
        caption: <FormattedMessage id="verificationModal.idcheck" />,
        origin: <FormattedMessage id={`verificationModal.fields.${doc.type}`} />,
        inProgress: false,
        fields: getFieldsFromSteps(doc)
      })
    })
    return documents
  }

  // For old identites, without _embedded
  identity.fullName && documents.push(getBackgroundCheck(identity))

  identity.documents &&
  identity.documents.forEach(doc => {
    documents.push({
      caption: <FormattedMessage id="verificationModal.idcheck" />,
      origin: <FormattedMessage id={`verificationModal.fields.${doc.type}`} />,
      inProgress: doc.status !== 'ready',
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
