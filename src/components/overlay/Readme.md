### Overlays

Simple overlay

```js
<div style={{ position: 'relative', height: '150px', overflow: 'auto' }}>
  <Overlay inline onClose={() => alert('the overlay was requested to close')}>
    <div style={{ color: 'white', maxWidth: '200px', overflowY: 'scroll' }}>
      Text inside overlay.
    </div>
  </Overlay>
  <p>
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay.
  </p>
</div>
```

Overlay with content overflow

```js
<div style={{ position: 'relative', height: '150px', overflow: 'auto' }}>
  <Overlay inline onClose={() => alert('the overlay was requested to close')}>
    <div style={{ color: 'white', maxWidth: '200px', overflowY: 'scroll' }}>
      Text inside overlay. Text inside overlay. Text inside overlay. Text inside
      overlay. Text inside overlay. Text inside overlay. Text inside overlay.
      Text inside overlay. Text inside overlay. Text inside overlay. Text inside
      overlay.
    </div>
  </Overlay>
  <p>
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay. Text below overlay. Text
    below overlay. Text below overlay. Text below overlay. Text below overlay.
    Text below overlay. Text below overlay. Text below overlay. Text below
    overlay. Text below overlay. Text below overlay.
  </p>
</div>
```

### Creating overlays

Put `<Container />` to your app. Use `createOverlay` and `closeOverlay` to show overlays.

```js
const { Container, createOverlay, closeOverlay } = require('.')

function ModalWindow({ onSave }) {
  return (
    <div style={{ background: 'white', padding: '40px' }}>
      <p>Sample modal window</p>
      <p>
        <button onClick={onSave}>Save and close</button>
      </p>
    </div>
  )
}

function handleClick() {
  createOverlay(<ModalWindow onSave={closeOverlay} />, {
    onClose: closeOverlay
  })
}

;<React.Fragment>
  <Container />
  <button onClick={handleClick}>Open sample overlay</button>
</React.Fragment>
```
