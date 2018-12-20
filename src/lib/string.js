import { startCase } from 'lodash'

export function titleCase(string = '') {
  return typeof string === 'string' ? startCase(string.toLowerCase()) : string
}
