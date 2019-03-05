import { cssVariable } from 'src/lib/dom'
export const COLOR_PRESETS = [
  [cssVariable('--mgi-theme-palette-lightblue'), 'blue'],
  [cssVariable('--mgi-theme-palette-green'), 'green'],
  [cssVariable('--mgi-theme-palette-red'), 'red'],
  [cssVariable('--mgi-theme-palette-pink'), 'pink'],
  [cssVariable('--mgi-theme-palette-orange'), 'orange'],
  [cssVariable('--mgi-theme-palette-yellow'), 'yellow']
]

export const AVAILABLE_DOCUMENT_TYPES = [
  'liveness',
  'passport',
  'national-id',
  'driving-license',
  'proof-of-residency'
]

export const MANDATORY_DOCUMENT_TYPES = ['liveness']

export const AVAILABLE_LANGUAGES = ['en', 'es', 'fr', 'pt']
