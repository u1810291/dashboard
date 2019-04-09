Wrap your elements to <Sections /> to separate blocks vertically

```js
const style = { height: '50px', borderRadius: '5px' }

;<React.Fragment>
  <Sections>
    <div style={{ ...style, background: 'pink' }} />
    <div style={{ ...style, background: 'crimson' }} />
    <div style={{ ...style, background: 'red' }} />
  </Sections>
</React.Fragment>
```

with `withBorder` property enabled

```js
const style = { height: '50px', borderRadius: '5px' }

;<React.Fragment>
  <Sections>
    <div style={{ ...style, background: 'RosyBrown' }} />
    <hr />
    <div style={{ ...style, background: 'Brown' }} />
    <hr />
    <div style={{ ...style, background: 'Wheat' }} />
  </Sections>
</React.Fragment>
```

with `extraGap` property enabled

```js
const style = { height: '50px', borderRadius: '5px' }

;<React.Fragment>
  <Sections extraGap>
    <div style={{ ...style, background: 'Chartreuse' }} />
    <div style={{ ...style, background: 'DeepPink' }} />
    <div style={{ ...style, background: 'PaleTurquoise' }} />
  </Sections>
</React.Fragment>
```
