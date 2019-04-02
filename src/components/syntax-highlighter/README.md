Basic example, note the height property on the container

```js
const code = `
<!-- Mati button-->
<div
  class="mati-button responsive"
  data-product="kyc"
  data-country="us"
  data-style="blue">
</div>

<!-- Mati script-->
<script id="matiscript" src="https://sdk.getmati.com/mati-sdk.min.js">
</script>

<!-- Mati button initialization -->
<script>
Mati.init({
  clientId: '5c9e0f78f2d304001bb5bc9a',
  metadata: {},
});
</script>
`
const { Container } = require('src/components/notification')

;<React.Fragment>
  <Container />
  <div style={{ height: '200px' }}>
    <SyntaxHighlighter language="html" code={code} />
  </div>
</React.Fragment>
```
