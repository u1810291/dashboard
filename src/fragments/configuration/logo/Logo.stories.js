import React from 'react';
import { storiesOf } from '@storybook/react';
import Logo from '.';

const stories = storiesOf('fragments/configuration/Logo', module);

stories.add('Default', () => (
  <Logo />
));
