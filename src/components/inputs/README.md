```js

initialState = {
  inputValue: '',
  selectValue: '',
  selectOptions: [
    {
      label: "First option",
      value: 1
    },
    {
      label: "Second option",
      value: 2
    },
    {
      label: "Third option",
      value: 3
    },
  ]
};

<div>
    <Inputs.Input
      label="Input label"
      value={state.inputValue}
      onChange={(e) => setState({ inputValue: e.target.value})}
      error={!state.inputValue && 'validations.required'}
    />
    <Inputs.DebounceInput
      label="Debounce Input label"
      value={state.inputValue}
      onChange={(e) => setState({ inputValue: e.target.value})}
      error={!state.inputValue && 'validations.required'}
    />
    <Inputs.Select
      label="Select label"
      options={state.selectOptions}
      onChange={(value) => setState({ selectValue: value.value})}
      error={!state.selectValue && 'validations.required'}
    />
    <Inputs.RadioButtonGroup
      label="Radio button group"
      name="radioButton"
      options={state.selectOptions}
    />
</div>
```
