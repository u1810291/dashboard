import React from 'react';
import { storiesOf } from '@storybook/react';
import Countries from '.';

const stories = storiesOf('fragments/configuration/Countries', module);
const countries = [
  {
    code: 'US',
    name: 'United States',
  },
  {
    code: 'UY',
    name: 'Uruguay',
  },
  {
    code: 'UZ',
    name: 'Uzbekistan',
  },
  {
    code: 'VU',
    name: 'Vanuatu',
  },
  {
    code: 'VA',
    name: 'Vatican City',
  },
  {
    code: 'VE',
    name: 'Venezuela',
  },
  {
    code: 'VN',
    name: 'Vietnam',
  },
  {
    code: 'WF',
    name: 'Wallis & Futuna',
  },
  {
    code: 'EH',
    name: 'Western Sahara',
  },
  {
    code: 'YE',
    name: 'Yemen',
  },
  {
    code: 'ZM',
    name: 'Zambia',
  },
  {
    code: 'ZW',
    name: 'Zimbabwe',
  },
  {
    code: 'AX',
    name: 'Åland Islands',
  },
];

const supportedCountries = ['US', 'UY', 'UZ', 'VU', 'VA', 'VE', 'VN'];
stories.add('Default', () => (
  <Countries
    countries={countries}
    supportedCountries={supportedCountries}
    onSubmit={() => {}}
  />
));
