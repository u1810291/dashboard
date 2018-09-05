import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from 'src/registerServiceWorker'
import IntlProvider from 'src/IntlProvider'
import Root from 'src/apps'

ReactDOM.render(
  (
    <IntlProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </IntlProvider>
  ),
  document.getElementById('root')
)

registerServiceWorker()
