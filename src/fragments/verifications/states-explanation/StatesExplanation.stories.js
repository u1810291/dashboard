import React from 'react';
import { storiesOf } from '@storybook/react';
import {default as StatesExplanation} from '.';

const stories = storiesOf('fragments/verifications/StatesExplanation', module);

stories.add('Default', () => (<StatesExplanation />));
