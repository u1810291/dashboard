import React from 'react'
import ReactDOM from 'react-dom'
import CSS from './Modal.css'

const modalRoot = document.getElementById('modalRoot')

const ModalWindow = ({
  children,
  onClose = () => {}
}) => (
  <div className={CSS.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
    <div className={CSS.window}>
      <button className={CSS.closeButton} onClick={onClose}></button>
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
      <ModalWindow {...this.props}>
        {this.props.children}
      </ModalWindow>,
      this.modalContainer
    )
  }
}
