import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import Overlay from './Overlay';

const reducer = (state, { overlay }) => ({ overlay });
const store = createStore(reducer);

const ContainerOverlay = connect((state) => state)(({ overlay }) => {
  const root = document.getElementById('overlayRoot');
  return overlay ? createPortal(<Overlay {...overlay} />, root) : null;
});

export default class Container extends Component {
  componentDidMount() {
    const root = document.createElement('div');
    root.id = 'overlayRoot';
    root.style.position = 'relative';
    document.body.appendChild(root);
  }

  componentWillUnmount() {
    document.getElementById('overlayRoot').remove();
  }

  render() {
    return (
      <Provider store={store}>
        <ContainerOverlay />
      </Provider>
    );
  }
}

export function closeOverlay() {
  store.dispatch({ type: 'CLOSE_OVERLAY' });
}

export function createOverlay(
  children,
  options = {
    onClose: closeOverlay,
  },
) {
  store.dispatch({ type: 'CREATE_OVERLAY', overlay: { children, ...options } });
}
