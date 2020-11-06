import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Overlay from '../Overlay/Overlay';
import CSS from './OverlayWithBlur.module.scss';

export class OverlayWithBlur extends Component {
  static defaultProps = {
    onClose: () => {},
  }

  static propTypes = {
    onClose: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.root = document.createElement('div');
    this.root.id = 'overlayRootWithBlur';
    this.root.className = CSS.overlayRootWithBlur;

    document.body.style.position = 'relative';
    document.body.appendChild(this.root);
  }

  render() {
    const { children, onClose } = this.props;
    return createPortal(<Overlay withBlur onClose={onClose}>{children}</Overlay>, this.root);
  }
}
