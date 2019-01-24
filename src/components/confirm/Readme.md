Confirmation modal

```js
const { ConfirmModal } = require('./Confirm')
;<ConfirmModal message="Message to confirm" />
```

`confirm` function

```js
const { Container } = require('../overlay')
const confirm = require('.').default
;<React.Fragment>
  <Container />
  <button
    onClick={() => confirm('Message to confirm').then(() => alert('Confirmed'))}
  >
    Open confirmation modal
  </button>
</React.Fragment>
```
