```js
const { Container } = require('components/overlay')
initialState = {
  steps: [['national-id', 'driving-license'], ['proof-of-residency']],
  availableDocumentTypes: [
    'passport',
    'national-id',
    'driving-license',
    'proof-of-residency'
  ],
  mandatoryDocumentTypes: ['liveness']
}
;<React.Fragment>
  <Container />
  <VerificationSteps {...state} onChange={setState} />
</React.Fragment>
```
