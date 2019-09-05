import React from 'react';
import { storiesOf } from '@storybook/react';
import TextField from '.';

const stories = storiesOf('components/forms/TextField', module);

stories.add('Default', () => (
  <TextField placeholder="Placeholder message" defaultValue="Input value" />
));
