import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './Modal.css'

export default class Modal extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = { closed: true };
  }

  close() {
    this.setState({ closed: true });
  }

  open() {
    this.setState({ closed: false });
  };

  render() {
    const openCloseClassName = this.state.closed ? 'closed' : '';
    return (
      <div className={classNames(CSS.modal, this.props.className, openCloseClassName)}>
        <div className="modal-title">{this.props.title}</div>
        <button className="close-button" onClick={this.close.bind(this)}>
          &times;
        </button>
        <div className="modal-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

