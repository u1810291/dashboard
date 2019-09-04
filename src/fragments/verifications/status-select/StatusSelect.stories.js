import React from 'react';
import { storiesOf } from '@storybook/react';
import StatusSelect from '.';

const stories = storiesOf('fragments/verifications/StatusSelect', module);

stories.add('Default', () => (<StatusSelect message="hello" />));
