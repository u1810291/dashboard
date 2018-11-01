import http, { getAuthHeader } from './http'

export function getIdentities(token) {
  return http.get('/v1/identities', {
    headers: { ...getAuthHeader(token) }
  })
}

export function getDocuments(token, id) {
  return http.get(`/v1/identities/${id}/documents?access_token=${token}`)
}

export async function getDocumentPictures(token, id) {
  return http.get(`/v1/documents/${id}/pictures?access_token=${token}`)
}

export async function getDocumentsFullData(token, id) {
  return getDocuments(token, id).then(({ data }) => Promise.all(data.map(async document => ({
    ...document,
    pictures: await getDocumentPictures(token, document.id).then(({data}) => data)
  }))))
}
