import React, { Component } from 'react'
import IntlProvider from 'src/components/intl-provider'
import { BrowserRouter } from 'react-router-dom'
import 'flex-box-grid/dist/scss/index.scss'

export default class Wrapper extends Component {
  render() {
    return (
      <IntlProvider>
        <BrowserRouter>
          {this.props.children}
        </BrowserRouter>
      </IntlProvider>
    )
  }
}
