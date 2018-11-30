import { isEmpty, intersection } from 'lodash'
import { AVAILABLE_DOCUMENT_TYPES } from '../merchant/consts'
import { compose } from 'redux'

const mapToDocumentTypeID = facematchScore => {
  if (
    typeof facematchScore === 'string' &&
    AVAILABLE_DOCUMENT_TYPES.includes(facematchScore)
  ) {
    return facematchScore
  } else {
    return facematchScore[0]
  }
}

const filterByTypes = types => identities => {
  if (isEmpty(types)) {
    return identities
  }

  return identities.filter(item => {
    return !isEmpty(
      intersection(types, item.facematchScore.map(mapToDocumentTypeID))
    )
  })
}

const filterBySearch = search => identities => {
  if (!search) {
    return identities
  }

  return identities.filter(
    item => item.fullName && item.fullName.toLowerCase().includes(search)
  )
}

const filterByStates = states => identities => {
  if (isEmpty(states)) {
    return identities
  }

  return identities.filter(item => states.includes(item.status))
}

export const buildFiltersChain = (search = '', types = [], states = []) => {
  return compose(
    filterBySearch(search.trim().toLowerCase()),
    filterByTypes(types),
    filterByStates(states)
  )
}
