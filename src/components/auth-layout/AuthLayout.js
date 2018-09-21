import React from 'react'
import CSS from './AuthLayout.css'

export default class AuthLayout extends React.Component {
  render() {
    return (
      <div className={CSS.layout}>
        <div className={CSS.layoutBackground}>
        </div>
        <div className={CSS.layoutContent}>
          {this.props.children}
        </div>
      </div>
    )
  }
}