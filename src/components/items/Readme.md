Use Items to group elements horizontally

### Basic example

```js
<Items>
  <div style={{ width: '100px', height: '80px', background: 'orange' }} />
  <div style={{ width: '40px', height: '160px', background: 'blue' }} />
</Items>
```

Basic example for inline items.

```js
<Items inline>
  <div style={{ height: '80px', width: '100px', background: 'silver' }} />
  <div style={{ height: '160px', width: '180px', background: 'gold' }} />
</Items>
```

With `smallGap` property

```js
<Items smallGap>
  <div style={{ width: '140px', height: '60px', background: 'crimson' }} />
  <div style={{ width: '220px', height: '100px', background: 'pink' }} />
</Items>
```

```js
<Items inline>
  <div style={{ height: '80px', width: '100px', background: 'silver' }} />
  <div style={{ height: '160px', width: '180px', background: 'gold' }} />
</Items>
```

### Align

Top (default)

```js
<Items inline align="top">
  <div style={{ minHeight: '20px', width: '150px', background: 'gray' }} />
  <div style={{ minHeight: '60px', width: '300px', background: 'black' }} />
</Items>
```

Bottom

```js
<Items inline align="bottom">
  <div style={{ minHeight: '20px', width: '150px', background: 'gray' }} />
  <div style={{ minHeight: '60px', width: '300px', background: 'black' }} />
</Items>
```

Center

```js
<Items inline align="center">
  <div style={{ minHeight: '20px', width: '150px', background: 'gray' }} />
  <div style={{ minHeight: '60px', width: '300px', background: 'black' }} />
</Items>
```

Stretch

```js
<Items inline align="stretch">
  <div style={{ minHeight: '20px', width: '150px', background: 'gray' }} />
  <div style={{ minHeight: '60px', width: '300px', background: 'black' }} />
</Items>
```

### Template

Use template property for adding size to columns. Use values from `grid-temnplate-columns` CSS rule

```js
<Items align="stretch" template="1fr 2fr 2fr">
  <div style={{ minHeight: '200px', background: 'gray' }} />
  <div style={{ background: 'black' }} />
  <div style={{ background: 'black' }} />
</Items>
```
