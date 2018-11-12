import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import CSS from './Dropdown.css'

const root = document.getElementById('dropdownRoot')

const DropdownWindow = ({
  children,
  className,
  onClose = () => {},
  target = document.body
}) => {
  // TODO: now works only for top menu. Add more positioning options
  const { bottom, right } = target.getClientRects()[0]
  return (
    <div
      className={CSS.overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className={classNames(CSS.window, className)}
        style={{ top: bottom, left: right }}
        onClick={onClose}
      >
        {children}
      </div>
    </div>
  )
}

export class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.container = document.createElement('div')
  }

  componentDidMount() {
    root.appendChild(this.container)
  }

  componentWillUnmount() {
    root.removeChild(this.container)
  }

  render() {
    return ReactDOM.createPortal(
      <DropdownWindow {...this.props}>{this.props.children}</DropdownWindow>,
      this.container
    )
  }
}
