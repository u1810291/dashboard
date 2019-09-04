import React from 'react';
import { storiesOf } from '@storybook/react';
import Text, { H1, H2 } from '.';

const stories = storiesOf('components/Text', module);

const colors = [
  'black',
  'gray',
  'darkgray',
  'darkergray',
  'lightgray',
  'lightergray',
  'blue',
  'lightblue',
  'lighterblue',
  'green',
  'red',
  'pink',
  'softpink',
  'darkpink',
  'orange',
  'yellow',
  'apricot',
  'darkapricot',
  'pistachio',
];

stories.add('Size', () => (
  <>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
      <p>
        Size
        {' '}
        {size}
:
        {' '}
        <Text size={size}>All their equipment and instruments are alive.</Text>
      </p>
    ))}
  </>
));

stories.add('Color', () => (
  <>
    {colors.map((color) => (
      <p>
        <Text size={4} color={color}>
          Color
          {' '}
          {color}
: All their equipment and instruments are alive.
        </Text>
      </p>
    ))}
  </>
));

stories.add('Weight', () => (
  <>
    {[0, 1, 2, 3, 4].map((weight) => (
      <p>
        <Text size={4} weight={weight}>
          Weight
          {' '}
          {weight}
: All their equipment and instruments are alive.
        </Text>
      </p>
    ))}
  </>
));

stories.add('Presets', () => (
  <>
    <H1>H1: All their equipment and instruments are alive.</H1>
    <H2>H2: All their equipment and instruments are alive.</H2>
  </>
));
