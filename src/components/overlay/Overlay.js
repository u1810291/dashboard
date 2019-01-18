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
  componentDidMount() {
    const parent = findRelativeParent(this.refs.overlay)
    parent.classList.add(CSS.noScroll)
  }

  componentWillUnmount() {
    const parent = findRelativeParent(this.refs.overlay)
    parent.classList.remove(CSS.noScroll)
  }

  render() {
    const { children, inline, onClose = () => {} } = this.props
    return (
      <div
        className={classNames(CSS.overlay, { [CSS.overlayInline]: inline })}
        onClick={e => e.target === e.currentTarget && onClose()}
        ref="overlay"
      >
        <button className={CSS.closeButton} onClick={onClose} />
        <div className={CSS.overlayContent}>{children}</div>
      </div>
    )
  }
}
