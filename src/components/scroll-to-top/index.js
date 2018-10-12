import React from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
      document.querySelectorAll('.router--scroll-to-top').forEach(element => element.scrollTo(0, 0))
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
