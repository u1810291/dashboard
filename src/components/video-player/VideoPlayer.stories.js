import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoPlayer from '.';

const stories = storiesOf('components/VideoPlayer', module);

stories.add('Default', () => (
  <VideoPlayer url="https://vimeo.com/336641127" aspectRatio="64:27" />
));
