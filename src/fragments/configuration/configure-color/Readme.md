```js
const presets = [
  ['#000000', 'black'],
  ['#333333', 'gray1'],
  ['#666666', 'gray2'],
  ['#999999', 'gray3']
]

initialState = {
  color: 'gray2'
}

<ConfigureColor presets={presets} style={initialState} onClick={setState} />
```
