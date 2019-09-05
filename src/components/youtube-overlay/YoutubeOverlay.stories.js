import React from 'react';
import { storiesOf } from '@storybook/react';
import openOverlay from '.';

const stories = storiesOf('components/YoutubeOverlay', module);

stories.add('Default', () => (
  <button onClick={() => openOverlay({ id: 'Z06gUeqUpeo' })}>
    Sample Overlay
  </button>
));
