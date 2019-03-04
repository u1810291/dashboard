```js
initialState = {
  supportedCountries: [
    {
      value: 'US',
      label: 'United States'
    },
    {
      value: 'RU',
      label: 'Russia'
    },
  ],
  countries: [
    {
      value: 'US',
      label: 'United States'
    },
    {
      value: 'RU',
      label: 'Russia'
    },
    {
      value: 'MX',
      label: 'Mexico'
    }
  ]
};

<CountriesModal 
  supportedCountries={state.supportedCountries}
  countries={state.countries}
  onSubmit={() => {}}
/>
```
