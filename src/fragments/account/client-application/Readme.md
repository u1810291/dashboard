```js
const { Container } = require('components/overlay')

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

initialState = {
  application: {
    clientId: '5c5c929014cb881f5730271e',
    clientSecret: '80ZR35QMCRUFD9XC9AQ377WEMBKCY4X0'
  },
  webhooks: [
    {
      id: '1',
      url: 'https://mati-callbacks-demo.firebaseio.com/webhooks.json'
    },
    {
      id: '2',
      url: 'https://en860xcg7be8q.x.pipedream.net/'
    }
  ]
}
;<React.Fragment>
  <Container />
  <ClientApplication
    {...state}
    deleteWebhook={deleteWebhook}
    subscribeToWebhook={subscribeToWebhook}
  />
</React.Fragment>
```
