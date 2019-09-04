import React from 'react';
import { storiesOf } from '@storybook/react';
import GooglePlayLink from '.';

const stories = storiesOf('fragments/integration/GooglePlayLink', module);

stories.add('Default', () => <GooglePlayLink clientId="CLIENT ID NUMBER" />);
