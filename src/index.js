import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import IntlProvider from 'src/components/intl-provider'
import StoreProvider from 'src/components/store-provider'
import ScrollToTop from 'src/components/scroll-to-top'
import Root from 'src/apps'
import 'clipboard-polyfill'

import './application.css'

ReactDOM.render(
  (
    <IntlProvider>
      <StoreProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Root />
          </ScrollToTop>
        </BrowserRouter>
      </StoreProvider>
    </IntlProvider>
  ),
  document.getElementById('root')
)
