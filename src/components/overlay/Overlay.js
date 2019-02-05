import React from 'react'
import classNames from 'classnames'
import CSS from './Overlay.module.scss'

export function findRelativeParent(element) {
  const parent = element.nodeName === 'HTML' ? element : element.parentElement
  return parent.style.position === 'relative' || parent.nodeName === 'HTML'
    ? parent
    : findRelativeParent(parent)
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

  render() {
    const { children, inline, onClose = () => {} } = this.props
    return (
      <div
        className={classNames(
          CSS.overlay,
          this.state.visible && CSS.overlayVisible,
          { [CSS.overlayInline]: inline }
        )}
        onClick={e => e.target === e.currentTarget && onClose()}
        ref="overlay"
      >
        <button className={CSS.closeButton} onClick={onClose} />
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
