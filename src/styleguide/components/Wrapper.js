import React, { Component } from 'react'
import IntlProvider from 'src/components/intl-provider'

export default class Wrapper extends Component {
  render() {
    return (
      <IntlProvider>
        {this.props.children}
      </IntlProvider>
    )
  }
}
