import React from 'react'
import { storiesOf } from '@storybook/react'
import LegalServices from '.'

const stories = storiesOf('fragments/product/LegalServices', module)

stories.add('Default', () => (<LegalServices message="hello" />))
