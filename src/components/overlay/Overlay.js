import React from 'react'
import classNames from 'classnames'
import CSS from './Overlay.module.scss'

export function findRelativeParent(element) {
  if (!element) {
    return;
  }

  const parent = element.nodeName === 'HTML' ? element : element.parentElement;

  if (parent) {
    return parent.style.position === 'relative' || parent.nodeName === 'HTML'
      ? parent
      : findRelativeParent(parent)
  } else {
    return element;
  }
}

export default class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  componentDidMount() {
    const parent = findRelativeParent(this.refs.overlay)
    parent.classList.add(CSS.noScroll)
    setTimeout(() => {
      this.setState({ visible: true })
    }, 0)
  }

  componentWillUnmount() {
    this.setState({ visible: false })
    const parent = findRelativeParent(this.refs.overlay)
    parent.classList.remove(CSS.noScroll)
  }

  onClose = () => {
    this.setState({ visible: false })
    setTimeout(() => {
      this.props.onClose && this.props.onClose()
    }, 200)
  }

  render() {
    const { children, inline } = this.props
    return (
      <div
        className={classNames(
          CSS.overlay,
          this.state.visible && CSS.overlayVisible,
          { [CSS.overlayInline]: inline }
        )}
        onClick={e => e.target === e.currentTarget && this.onClose()}
        ref="overlay"
      >
        <button className={CSS.closeButton} onClick={this.onClose} />
        <div
          className={classNames(
            CSS.overlayContent,
            this.state.visible && CSS.overlayContentVisible
          )}
        >
          {children}
        </div>
      </div>
    )
  }
}
