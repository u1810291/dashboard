import { buildFiltersChain } from './filtering'

it('identities filtering return the same collection on empty filters', () => {
  expect(buildFiltersChain()(IDENTITIES_WITH_TYPES).length).toEqual(10)
})

it('identities filtering return proper results', () => {
  expect(
    buildFiltersChain('', ['passport'])(IDENTITIES_WITH_TYPES).length
  ).toEqual(3)
  expect(
    buildFiltersChain('', ['national-id'])(IDENTITIES_WITH_TYPES).length
  ).toEqual(5)
  expect(
    buildFiltersChain('', ['passport'])(IDENTITIES_WITH_TYPES).length
  ).toEqual(3)
})

const IDENTITIES_WITH_TYPES = [
  { facematchScore: [] },
  { facematchScore: [] },
  {
    facematchScore: [
      ['national-id', 1],
      ['national-id', 0],
      ['national-id', 0],
      ['passport', 72],
      ['passport', 72]
    ]
  },
  { facematchScore: [['passport', 99], ['national-id', 99]] },
  { facematchScore: [] },
  { facematchScore: ['passport', 0] },
  { facematchScore: ['national-id', 0] },
  { facematchScore: ['national-id', 0] },
  { facematchScore: ['national-id', 0] },
  { facematchScore: [] }
]
