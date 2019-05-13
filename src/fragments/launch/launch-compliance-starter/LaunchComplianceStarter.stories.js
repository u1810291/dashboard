import React from 'react'
import { storiesOf } from '@storybook/react'
import LaunchComplianceStarter from '.'

const stories = storiesOf('fragments/launch/LaunchComplianceStarter', module)

stories.add('Default', () => <LaunchComplianceStarter />)
