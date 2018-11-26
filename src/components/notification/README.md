How to use notifications in code:

```js static
import { notification } from 'src/components/notification'

...
  notification('Default notification')
...
  notification.info('Info notification')
...
  notification.warn('Warn notification')
...
  notification.error('Error notification')
...

```

Demo toast

```js
const NotificationContainer = require('src/components/notification').Container
const notification = require('src/components/notification').notification

const showAllNotifications = () => {
  notification.info('Info notification example')
  notification.success('Success notification example')
  notification.warn('Warn notification example')
  notification.error('Error notification example')
}

;<React.Fragment>
  <NotificationContainer autoClose={false} />
  <button onClick={showAllNotifications}>Show all notification types</button>
</React.Fragment>
```
