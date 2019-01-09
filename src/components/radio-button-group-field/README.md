Radio button group field example

```js
initialState = {
  items: [
    { label: 'Hulk', value: 'hulk' },
    { label: 'Iron Man', value: 'ironman' },
    { label: 'Wolverine', value: 'wolverine' }
  ],
  value: 'ironman'
};

<RadioButtonGroupField
  name="superHeroes"
  label="Super Heroes"
  options={state.items}
  values={state.value}
  onChange={value => {
    setState({ value })
  }}
/>
```
