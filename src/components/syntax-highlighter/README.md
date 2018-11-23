```js
const code = require('./light.js').default;
const stringify = require('src/lib/stringify').default;
<SyntaxHighlighter
  dark={false}
  language="javascript"
  copyToClipboard
  code={stringify(code)}
  wrapperStyle={{ height: '400px' }}
/>
```

```js
const code = require('./dark.js').default;
const stringify = require('src/lib/stringify').default;
<SyntaxHighlighter
  dark={true}
  language="javascript"
  code={stringify(code)}
  wrapperStyle={{ height: '400px' }}
/>
```
