import React from 'react';
import { storiesOf } from '@storybook/react';
import CardWithStub, { Stub } from '.';

const stories = storiesOf('components/CardWithStub', module);

const stub = <Stub background="pink">9</Stub>;
const stubNoNumber = <Stub background="pink" />;

stories.add('Default', () => (
  <CardWithStub stub={stub} background="apricot">
    <p>abc</p>
    <p>abc</p>
    <p>abc</p>
  </CardWithStub>
));

stories.add('Without number', () => (
  <CardWithStub stub={stubNoNumber} background="apricot">
    <p>abc</p>
    <p>abc</p>
    <p>abc</p>
  </CardWithStub>
));
