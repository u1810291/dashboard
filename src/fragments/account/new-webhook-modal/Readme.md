```js
function onSave(url, secret) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (!url) reject({ url: 'must exist' })
      if (!secret) reject({ secret: 'must exist' })
      resolve()
    }, 500)
  })
}
;<NewWebhookModal onSave={onSave} onClose={() => {}} />
```
