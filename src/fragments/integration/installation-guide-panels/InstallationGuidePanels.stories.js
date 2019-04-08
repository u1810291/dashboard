import React from 'react'
import { storiesOf } from '@storybook/react'
import { Container } from 'src/components/overlay'
import {
  LetsStartPanel,
  VerificationPanel,
  ApplicationsPanel,
  InstallFrontendCodePanel,
  SetWebhooksPanel
} from '.'

const stories = storiesOf(
  'fragments/integration/InstallationGuidePanels',
  module
).addDecorator(story => (
  <React.Fragment>
    <Container />
    {story()}
  </React.Fragment>
))

stories.add('LetsStartPanel', () => <LetsStartPanel />)
stories.add('VerificationPanel', () => <VerificationPanel />)
stories.add('ApplicationsPanel', () => <ApplicationsPanel />)
stories.add('InstallFrontendCodePanel', () => <InstallFrontendCodePanel />)
stories.add('SetWebhooksPanel', () => <SetWebhooksPanel />)
