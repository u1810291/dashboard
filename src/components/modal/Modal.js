import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import CSS from './Modal.css'

const ModalWindow = ({
  children,
  className,
  onClose = () => {},
  wide = false
}) => (
  <div
    className={CSS.overlay}
    onClick={e => e.target === e.currentTarget && onClose()}
  >
    <div className={classNames(CSS.window, className, { wide })}>
      <button className={CSS.closeButton} onClick={onClose} />
      {children}
    </div>
  </div>
)

export class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.modalContainer = document.createElement('div')
  }

  componentDidMount() {
    const modalRoot = document.getElementById('modalRoot')
    modalRoot && modalRoot.appendChild(this.modalContainer)
  }

  componentWillUnmount() {
    this.modalContainer && this.modalContainer.remove()
  }

  render() {
    return ReactDOM.createPortal(
      <ModalWindow {...this.props}>{this.props.children}</ModalWindow>,
      this.modalContainer
    )
  }
}
