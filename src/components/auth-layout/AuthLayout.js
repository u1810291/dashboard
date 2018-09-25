import React from 'react'
import { Helmet } from "react-helmet"
import CSS from './AuthLayout.css'

export default class AuthLayout extends React.Component {
  render() {
    return (
      <div className={CSS.layout}>
        <Helmet>
          <title>Mati Dashboard</title>
        </Helmet>
        <div className={CSS.layoutBackground}>
        </div>
        <div className={CSS.layoutContent}>
          {this.props.children}
        </div>
      </div>
    )
  }
}