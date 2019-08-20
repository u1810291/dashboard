import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Overlay from './Overlay';

import CSS from './Overlay.module.scss';

export default class OverlayWithBlur extends Component {
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
    return createPortal(<Overlay onClose={onClose}>{children}</Overlay>, this.root)
  }
}
