```js
initialState = {
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'rice', label: 'Rice' },
  ],
  value: [{ value: 'strawberry', label: 'Strawberry' },
  { value: 'rice', label: 'Rice' }]
};
<div>
    <h3>Common usage</h3>
    <MultiSelect
        onChange={(value) => setState({value})}
        options={state.options}
        value={state.value}
    />
    <h3>Is loading</h3>
    <MultiSelect
        isLoading={true}
    />
</div>
```
