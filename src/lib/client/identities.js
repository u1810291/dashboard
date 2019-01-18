import http, { getAuthHeader } from './http'

export function getIdentity(token, id) {
  return http.get(`/v1/identities/${id}`, {
    headers: { ...getAuthHeader(token) }
  })
}

export function getIdentities(token) {
  return http.get('/v1/identities', {
    headers: { ...getAuthHeader(token) }
  })
}

export function patchIdentity(token, id, data) {
  return http.patch(`/v1/identities/${id}`, data, {
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
  return getDocuments(token, id).then(({ data }) => Promise.all(data.map(async document => ({
    ...document,
    pictures: await getDocumentPictures(token, document.id).then(({data}) => data)
  }))))
}

export function getIdentityWithNestedData(token, id) {
  return getIdentity(token, id).then(async ({ data }) => ({
    ...data,
    originalIdentity: data,
    documents: await getDocumentsFullData(token, id)
  }))
}

export function patchDocument(token, id, fields) {
  return http.patch(`/v1/documents/${id}`, { fields }, {
    headers: { ...getAuthHeader(token) }
  })
}
