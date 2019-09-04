import React from 'react';
import { storiesOf } from '@storybook/react';
import MatiChecks from '.';

const stories = storiesOf('fragments/verifications/MatiChecks', module);

stories.add('Default', () => (<MatiChecks />));
