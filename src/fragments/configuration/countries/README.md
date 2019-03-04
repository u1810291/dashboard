```js
initialState = {
  countries: [
    {
      code: 'US',
      name: 'United State'
    },
    {
      code: 'MX',
      name: 'Mexico'
    },
    {
      code: 'RU',
      name: 'Russia'
    }
  ],
  supportedCountries: [
    'MX',
    'RU' 
  ]
};

<Countries
  countries={state.countries}
  supportedCountries={state.supportedCountries}
  onSubmit={() => {}}
/>
```
