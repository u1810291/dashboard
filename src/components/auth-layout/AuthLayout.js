import React from 'react'
import { Helmet } from "react-helmet"
import MediaQuery from 'react-responsive'
import CSS from './AuthLayout.css'

export default class AuthLayout extends React.Component {
  render() {
    return (
      <div className={CSS.layout}>
        <Helmet>
          <title>Mati Dashboard</title>
        </Helmet>
        <MediaQuery query="(min-width: 769px)">
          <div className={CSS.layoutBackground} />
        </MediaQuery>
        <div className={CSS.layoutContent}>
          {this.props.children}
        </div>
      </div>
    )
  }
}