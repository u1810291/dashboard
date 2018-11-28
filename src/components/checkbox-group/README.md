Checkbox group example

```js
initialState = {
  items: [
    { label: 'Hulk', value: 'hulk' },
    { label: 'Iron Man', value: 'ironman' },
    { label: 'Wolverine', value: 'wolverine' }
  ],
  values: ['ironman']
};

<CheckboxGroup
  label="Super Heroes"
  items={state.items}
  values={state.values}
  onChange={values => {
    setState({ values })
  }}
/>
```
