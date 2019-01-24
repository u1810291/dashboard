```js
const { Container } = require('src/components/overlay')
initialState = {
  webhooks: [
    {
      id: 1,
      url:
        'https://www.figma.com/file/ZCLoglyVHnrn8Kzo5Xor40pAZCLoglyVHnrn8Kzo5Xor40pAZCLoglyVHnrn8Kzo5Xor40pAZCLoglyVHnrn8Kzo5Xor40pA/Mati-Dashboard?node-id=2156%3A3133'
    },
    {
      id: 2,
      url: 'http://localhost:6060/#!/WebhookUrlForm'
    },
    {
      id: 3,
      url: 'http://localhost:6060/#/UI%20Components%20Library?id=datatable'
    }
  ]
}
function subscribeToWebhook(url, secret) {
  return new Promise((resolve, reject) => {
    if (!url) return reject({ url: 'Must exist' })
    if (!secret) return reject({ secret: 'Must exist' })
    setState(
      {
        webhooks: [...state.webhooks, { url, secret, id: new Date().getTime() }]
      },
      resolve
    )
  })
}
function deleteWebhook(webhookId) {
  setState({
    webhooks: state.webhooks.filter(({ id }) => id !== webhookId)
  })
}
;<React.Fragment>
  <Container />
  <Webhooks
    subscribeToWebhook={subscribeToWebhook}
    deleteWebhook={deleteWebhook}
    webhooks={state.webhooks}
  />
</React.Fragment>
```
