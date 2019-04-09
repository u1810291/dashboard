import initStoryshots from '@storybook/addon-storyshots'
// import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

jest.mock('../.storybook/intlDecorator', () => fn => fn())
jest.mock('../.storybook/storyStylesDecorator', () => fn => fn())

initStoryshots({ suite: 'Fragments storyshots', storyKindRegex: /^fragments/ })
initStoryshots({
  suite: 'Components storyshots',
  storyKindRegex: /^components/
  // test: imageSnapshot()
})
