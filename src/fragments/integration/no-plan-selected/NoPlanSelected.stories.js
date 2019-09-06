import React from 'react';
import { storiesOf } from '@storybook/react';
import NoPlanSelected from '.';

const stories = storiesOf('fragments/integration/NoPlanSelected', module);

stories.add('Default', () => (<NoPlanSelected message="hello" />));
