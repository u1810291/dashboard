import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import IntlProvider from 'src/components/intl-provider'
import StoreProvider from 'src/components/store-provider'
import ScrollToTop from 'src/components/scroll-to-top'
import Root from 'src/apps'
import { Container as NotificationsContainer } from 'src/components/notification'
import 'clipboard-polyfill'

import 'src/components/theme/styles.scss'

ReactDOM.render(
  <IntlProvider>
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Root />
          <NotificationsContainer
            closeButton={false}
            hideProgressBar={true}
            pauseOnHover={false}
            draggable={false}
            autoClose={5000}
          />
        </ScrollToTop>
      </BrowserRouter>
    </StoreProvider>
  </IntlProvider>,
  document.getElementById('root')
)
