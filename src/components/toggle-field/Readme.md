Default:

```js
initialState = { checked: false }
;<ToggleField
  checked={state.checked}
  onClick={checked => setState({ checked })}
/>
```

Checked and disabled:

```js
<ToggleField checked disabled />
```
