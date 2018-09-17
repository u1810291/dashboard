import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from 'src/registerServiceWorker'
import IntlProvider from 'src/components/intl-provider'
import StoreProvider from 'src/components/store-provider'
import Root from 'src/apps'

import './application.css'

ReactDOM.render(
  (
    <IntlProvider>
      <StoreProvider>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </StoreProvider>
    </IntlProvider>
  ),
  document.getElementById('root')
)

registerServiceWorker()
