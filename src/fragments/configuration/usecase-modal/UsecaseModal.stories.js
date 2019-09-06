import React from 'react';
import { storiesOf } from '@storybook/react';
import UsecaseModal from '.';

const stories = storiesOf('fragments/configuration/UsecaseModal', module);

stories.add('Default', () => (<UsecaseModal message="hello" />));
