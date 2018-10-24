import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import CSS from './Modal.css'

const modalRoot = document.getElementById('modalRoot')

const ModalWindow = ({ children, className, onClose = () => {} }) => (
  <div
    className={CSS.overlay}
    onClick={e => e.target === e.currentTarget && onClose()}
  >
    <div className={classNames(CSS.window, className)}>
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
    modalRoot.appendChild(this.modalContainer)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.modalContainer)
  }

  render() {
    return ReactDOM.createPortal(
      <ModalWindow {...this.props}>{this.props.children}</ModalWindow>,
      this.modalContainer
    )
  }
}
