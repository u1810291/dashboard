import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import CSS from './Overlay.module.scss';

export function findRelativeParent(element) {
  if (!element) {
    return undefined;
  }

  const parent = element.nodeName === 'HTML' ? element : element.parentElement;

  if (parent) {
    return parent.style.position === 'relative' || parent.nodeName === 'HTML'
      ? parent
      : findRelativeParent(parent);
  } else {
    return element;
  }
}

export default class Overlay extends React.Component {
  static defaultProps = {
    inline: false,
    onClose: () => {},
    withBlur: false,
  };

  static propTypes = {
    inline: PropTypes.bool,
    onClose: PropTypes.func,
    withBlur: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const { refs: { overlay } } = this;
    const parent = findRelativeParent(overlay);
    parent.classList.add(CSS.noScroll);
    setTimeout(() => {
      this.setState({ visible: true });
    }, 0);
  }

  componentWillUnmount() {
    const { refs: { overlay } } = this;
    this.setState({ visible: false });
    const parent = findRelativeParent(overlay);
    parent.classList.remove(CSS.noScroll);
  }

  onClose = () => {
    this.setState({ visible: false });
    setTimeout(() => {
      this.props.onClose();
    }, 200);
  };

  render() {
    const { props: { children, inline, options, withBlur }, state: { visible } } = this;
    return (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={classNames(
          withBlur ? CSS.blurOverlay : CSS.overlay,
          visible && CSS.overlayVisible,
          { [CSS.overlayInline]: inline },
          options?.additionalClasses?.map((item) => CSS[item]),
        )}
        onClick={(e) => e.target === e.currentTarget && (options?.onClose() || this.onClose())}
        ref="overlay" // eslint-disable-line react/no-string-refs
      >
        <span
          className={classNames(
            withBlur ? CSS.blurOverlayContent : CSS.overlayContent,
            visible && CSS.overlayContentVisible,
          )}
        >
          {children}
        </span>
      </div>
    );
  }
}
