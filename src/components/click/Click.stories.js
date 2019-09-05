import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Click from '.';

const stories = storiesOf('components/Click', module);

stories.add('Default', () => (
  <Click onClick={action('button-click')}>La Button</Click>
));

stories.add('Link', () => (
  <Click onClick={action('button-click')} as="a" href="/" background="active">
    La Button
  </Click>
));

stories.add('With Shadow', () => (
  <Click onClick={action('button-click')} shadow={1}>
    <strong>La Button</strong>
  </Click>
));

stories.add('Not inline', () => (
  <Click onClick={action('button-click')} shadow={1} inline={false}>
    La Button
  </Click>
));
