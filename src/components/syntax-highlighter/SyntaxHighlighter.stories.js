import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import SyntaxHighlighter from '.'

const code = `<!-- Mati button-->
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
const stories = storiesOf('components/SyntaxHighlighter', module)
stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <SyntaxHighlighter
    showCopyToClipboard={boolean('showCopyToClipboard', true)}
    language="html"
    code={code}
  />
))
