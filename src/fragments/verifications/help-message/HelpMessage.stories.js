import React from 'react'
import { storiesOf } from '@storybook/react'
import HelpMessage from '.'

const id = 'alteration-detection';
const intlMessages = {
  'fragments.verifications.help-messages.alteration-detection.title': 'Alteration Detection',
  'fragments.verifications.help-messages.alteration-detection.subtitle': 'Checks that the document was not altered (i.e. document was edited by Photoshop)',
  'fragments.verifications.help-messages.alteration-detection.table.1.1': 'Not Alterated',
  'fragments.verifications.help-messages.alteration-detection.table.1.2': 'Document is not altered.',
  'fragments.verifications.help-messages.alteration-detection.table.2.1': 'Alterated',
  'fragments.verifications.help-messages.alteration-detection.table.2.2': 'This document is altered.',
};

const stories = storiesOf('fragments/verifications/HelpMessage', module)

stories.add('Default', () => (<HelpMessage data={intlMessages} id={id} />))
