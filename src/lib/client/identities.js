import { get } from 'lodash'
import http, { getAuthHeader, authorizedUrl } from './http'

export function getIdentityListCount(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token) {
        resolve({ data: 4 })
      } else {
        throw new Error('Token is required!')
      }
    }, 1000)
  })
}

export function getIdentity(token, id) {
  return http.get(`/v1/identities/${id}?embed=verification`, {
    headers: { ...getAuthHeader(token) }
  })
}

export function getIdentities(token, params) {
  return http.get('/v1/identities', {
    params,
    paramsSerializer: paramsSerializer,
    headers: { ...getAuthHeader(token) }
  })
}

export function getIdentitiesCount(token, params) {
  return http.get('/v1/identities/count', {
    params,
    paramsSerializer: paramsSerializer,
    headers: { ...getAuthHeader(token) }
  })
}

export function patchIdentity(token, id, data) {
  return http.patch(`/v1/identities/${id}`, data, {
    headers: { ...getAuthHeader(token) }
  })
}

export function deleteIdentity(token, id) {
  return http.delete(`/v1/identities/${id}`, {
    headers: { ...getAuthHeader(token) }
  })
}

function getDocuments(token, id) {
  return http.get(`/v1/identities/${id}/documents?access_token=${token}`)
}

async function getDocumentPictures(token, id) {
  return http.get(`/v1/documents/${id}/pictures?access_token=${token}`)
}

async function getDocumentsFullData(token, id) {
  return getDocuments(token, id).then(({ data }) =>
    Promise.all(
      data.map(async document => ({
        ...document,
        pictures: await getDocumentPictures(token, document.id).then(
          ({ data }) => data
        )
      }))
    )
  )
}

export function getIdentityWithNestedData(token, id) {
  return getIdentity(token, id).then(async ({ data }) => {
    let identity = {
      ...data,
      originalIdentity: data
    }
    if (!data._embedded || !data._embedded.verification) {
      identity.documents = await getDocumentsFullData(token, id)
    }
    if (
      get(data, '_embedded.verification.steps') &&
      get(data, '_links.video.href') &&
      data._embedded.verification.steps.find(step => step.id === 'liveness')
    ) {
      const video = await http.get(authorizedUrl(data._links.video.href, token))
      const stepIndex = data._embedded.verification.steps.findIndex(
        step => step.id === 'liveness'
      )

      const step = identity._embedded.verification.steps[stepIndex]
      identity._embedded.verification.steps[stepIndex].data = {
        ...step.data,
        videoUrl: authorizedUrl(video.data._links.file.href, token)
      }
    }
    return identity
  })
}

export function patchDocument(token, id, fields) {
  return http.patch(
    `/v1/documents/${id}`,
    { fields },
    {
      headers: { ...getAuthHeader(token) }
    }
  )
}

function paramsSerializer(params) {
  // return qs.stringify(params, {arrayFormat: 'comma'})
  const searchParams = new URLSearchParams()
  for (const key of Object.keys(params)) {
    const param = params[key]
    if (Array.isArray(param)) {
      searchParams.append(key, param.join(','))
    } else if (typeof param === 'object') {
      searchParams.append(key, JSON.stringify(param))
    } else {
      searchParams.append(key, param)
    }
  }
  return searchParams.toString()
}
