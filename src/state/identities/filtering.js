import { isEmpty } from 'lodash'
import { compose } from 'lodash/fp'

const itemVerificationsFilterFunctions = {
  'face-verification': item => !!item.alive,
  'national-id': item =>
    item.facematchScore.some(fs => fs[0] === 'national-id'),
  'driving-license': item =>
    item.facematchScore.some(fs => fs[0] === 'driving-license'),
  passport: item => {
    return item.facematchScore.some(fs => fs[0] === 'passport');
  },
  residency: item =>
    item.facematchScore.some(fs => fs[0] === 'residency')
}

export const filterByTypes = types => identities => {
  if (isEmpty(types)) {
    return identities
  }

  return identities.filter(item => {
    return types.some(filterType =>
      itemVerificationsFilterFunctions[filterType](item)
    )
  })
}

export const filterBySearch = search => identities => {
  if (!search) {
    return identities
  }

  return identities.filter(item => item.fullName && item.fullName.toLowerCase().includes(search))
}

export const filterByStates = states => identities => {
  if (isEmpty(states)) {
    return identities
  }

  return identities.filter(item => states.includes(item.status))
}

