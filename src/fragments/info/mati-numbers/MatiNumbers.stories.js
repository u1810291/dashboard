import React from 'react';
import { storiesOf } from '@storybook/react';
import MatiNumbers from '.';

const stories = storiesOf('fragments/info/MatiNumbers', module);

stories.add('Default', () => (<MatiNumbers message="hello" />));
